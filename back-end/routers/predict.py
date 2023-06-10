from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io
import os
import numpy as np
import tensorflow as tf
import re

router = APIRouter()

crop_disease = {
    0: 'Apple___Cedar_apple_rust',
    1: 'Apple___healthy',
    2: 'Blueberry___healthy',
    3: 'Cherry_(including_sour)___Powdery_mildew',
    4: 'Cherry_(including_sour)___healthy',
    5: 'Corn_(maize)___Common_rust_',
    6: 'Corn_(maize)___healthy',
    7: 'Grape___Black_rot',
    8: 'Grape___healthy',
    9: 'Peach___Bacterial_spot',
    10: 'Peach___healthy',
    11: 'Pepper,_bell___Bacterial_spot',
    12: 'Pepper,_bell___healthy',
    13: 'Potato___Early_blight',
    14: 'Potato___Late_blight',
    15: 'Potato___healthy',
    16: 'Strawberry___Leaf_scorch',
    17: 'Strawberry___healthy',
    18: 'Tomato___Bacterial_spot',
    19: 'Tomato___healthy'
}

interpreter = tf.lite.Interpreter(model_path='./models/cropAgent.tflite')
interpreter.allocate_tensors()

from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms import OpenAI
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
#
llm = ChatOpenAI(temperature=0)
#define tools for the agent
tools = load_tools(['wikipedia','wolfram-alpha'],llm=llm)
#Setting a memory for conversation
memory = ConversationBufferMemory(memory_key="chat_history",return_messages=True)
#Define Agent
agent = initialize_agent(tools,llm,agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
                         verbose=True,
                         memory=memory,
                         max_iterations=6)


@router.post('/predict')
async def getPrediction(image: UploadFile = File(...)):

    with open("temp_image.jpg", "wb") as file:
        file.write(await image.read())

    # image_path = 'cropdisease/valid/Apple___Cedar_apple_rust/025b2b9a-0ec4-4132-96ac-7f2832d0db4a___FREC_C.Rust 3655_newGRR.JPG'
    image = tf.keras.preprocessing.image.load_img("temp_image.jpg", target_size=(224, 224,3))
    input_image = tf.keras.preprocessing.image.img_to_array(image)
    input_image = tf.expand_dims(input_image, axis=0)
    input_image /= 255.0 

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], input_image)
    interpreter.invoke()
    predictions = interpreter.get_tensor(output_details[0]['index'])

    prediction_result = np.argmax(predictions)
    prediction_result = crop_disease[prediction_result]
    prediction_result = re.sub(r'_{1,}', ' ', prediction_result)

    # Perform prediction using the loaded model
    os.remove("temp_image.jpg")
    return {
     "prediction" : prediction_result
    }

@router.get('/predict/{pred_result}')
def getDetailsOfDisease(pred_result: str):
    
    about = f"Please tell me about {pred_result} crop"
    try:
        info = agent.run(input=about)
        return {"question_number" : q_num}
    except Exception as e:
        info =str(e)
        if info.startswith("Could not parse LLM output: `"):
            info = info.removeprefix("Could not parse LLM output: `").removesuffix("`")
        else:
            raise Exception(str(e))
   
    

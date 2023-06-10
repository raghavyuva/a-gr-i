# main.py
from fastapi import FastAPI, UploadFile,File
from pydantic import BaseModel
from PIL import Image
import io
# import tensorflow as tf
from router import user

import numpy as np 

# Define the FastAPI app
app = FastAPI()

app.include_router(user.router)

# Define the input data schema using Pydantic
class ImageRequest(BaseModel):
    image: UploadFile

# Define the input data schema for cause
class CauseInput(BaseModel):
    data : str
# Load the trained TensorFlow model
# model = tf.keras.models.load_model('path_to_your_model.h5')

# Define the prediction route
@app.post("/predict")
def predict(image: UploadFile = File(...)):
    # Read and preprocess the image
    image_data = image.file.read()
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((224, 224))  # Resize the image to match the model's input shape
    image_array = np.array(image) / 255.0  # Normalize pixel values to the range [0, 1]
    image_array = np.expand_dims(image_array, axis=0)  # Add a batch dimension

    # Perform prediction using the loaded model
    # prediction = model.predict(image_array)

    # Convert the prediction to a human-readable label
    # labels = ['class1', 'class2', 'class3']  # Replace with your actual class labels
    # predicted_label = labels[np.argmax(prediction)]

    # Return the prediction as the API response
    # return {"prediction": predicted_label}


@app.post('/prompt/cause')
async def getCause( cause : CauseInput ):
    return {
        "message" : "Calling Cause route"
    }

@app.get('/')
def server():
    return {
        "message" : "Server is working"
    }
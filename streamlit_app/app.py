import pandas as pd
import pickle
import warnings
import streamlit as st
import getData
import random
import requests

api_key = "ce2738bd05e0d22a865f145a098726e1"
city_name = "Bangalore"

api_url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}"

warnings.filterwarnings('ignore')

st.title("Fertilizer Recommender")

response = requests.get(api_url)
data = response.json()

if response.status_code == 200:
    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
else:
    pass

crop = st.selectbox("Select Crop Type",['Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley',
       'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts'])
soil = st.selectbox("Select Soil type",['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'])

# Load the data
data = pd.DataFrame({
    'Temparature': [temperature],
    'Humidity ': [humidity],
    'Moisture': [random.randint(34,39)],
    'Soil Type': soil,
    'Crop Type': crop,
    'Nitrogen': [random.randint(17,35)],
    'Potassium': [random.randint(0,10)],
    'Phosphorous': [random.randint(0,10)]
})

# Convert categorical variables into numerical labels
data['Soil Type'] = data['Soil Type'].astype('category').cat.codes
data['Crop Type'] = data['Crop Type'].astype('category').cat.codes

st.markdown(f"#### Temparature:{temperature}")
st.markdown(f"#### Humidity:{humidity}")

# Load the trained model from the pickle file
with open('naivebayes.pkl', 'rb') as file:
    model = pickle.load(file)

predictions = model.predict(data)
if predictions[0] == '17-17-17':
    predictions[0] = "DAP"
st.markdown(f"#### {predictions[0]} fertilizer type")

prompt_choice = st.selectbox("Prompt",("about","how to use"))

if prompt_choice:
    if prompt_choice == "about":
        prompt = f"Please describe {predictions[0]} fertilizer type"
    elif prompt_choice == 'how to use':
        prompt = f"Please describe how to use {predictions[0]} fertilizer"
        
    response = getData.generateResponse(predictions[0],prompt)
    st.write(response)
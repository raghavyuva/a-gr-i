import pandas as pd
import pickle
import warnings
import os
from llama_index import download_loader

os.environ['OPENAI_API_KEY'] = 'API_KEY'
warnings.filterwarnings('ignore')

# Load the data
data = pd.DataFrame({
    'Temperature': [26],
    'Humidity': [52],
    'Moisture': [38],
    'Soil_Type': ['Sandy'],
    'Crop_Type': ['Maize'],
    'Nitrogen': [37],
    'Potassium': [0],
    'Phosphorous': [0]
})

# Convert categorical variables into numerical labels
data['Soil_Type'] = data['Soil_Type'].astype('category').cat.codes
data['Crop_Type'] = data['Crop_Type'].astype('category').cat.codes

# Load the trained model from the pickle file
with open('naivebayes.pkl', 'rb') as file:
    model = pickle.load(file)

predictions = model.predict(data)

# create a wikipedia download loader object
WikipediaReader = download_loader("WikipediaReader")

# load the wikipedia reader object
loader = WikipediaReader()
documents = loader.load_data(pages=[predictions[0]])

about = f"Please describe {predictions[0]} fertilizer type"
how_to_use = f"Please describe how to use {predictions[0]} fertilizer"

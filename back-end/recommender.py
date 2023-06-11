import pandas as pd
import pickle
import warnings

import getData

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

about = f"Please describe {predictions[0]} fertilizer type"
how_to_use = f"Please describe how to use {predictions[0]} fertilizer"

response = getData.generateResponse(predictions[0],how_to_use)
print(response)
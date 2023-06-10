from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from PIL import Image
app = FastAPI()

@app.get('/')
def server():
    return { "success" : 'true', 'message' : 'server is working'}


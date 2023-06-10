from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
app = FastAPI()

from routers import predict

app.include_router(predict.router)

@app.get('/')
def server():
    return { "success" : 'true', 'message' : 'server is working'}


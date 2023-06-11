from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from routers import predict

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router)

@app.get('/')
def server():
    return { "success" : 'true', 'message' : 'server is working'}


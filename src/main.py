from src.back_end.login import login, UserCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from requests import request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your actual frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/login")
async def login_meth(user_data: UserCredentials):
    user = user_data.user
    password = user_data.password
    result = login(user, password)
    return result
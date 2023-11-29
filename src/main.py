from src.back_end.routers import login, hotel, room, userAccount

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from requests import request


app = FastAPI()
app.include_router(login.router)
app.include_router(hotel.router)
app.include_router(room.router)
app.include_router(userAccount.router)

origins = [
    "http://localhost:3000",
    "https://travelapp-200.web.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Change this to your actual frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



import sqlite3
from fastapi import APIRouter, HTTPException
from src.database.user_database.user_database import add_user,get_user_by_username
from src.back_end.security import get_password_hash, verify_password
from pydantic import BaseModel

router = APIRouter(prefix="/user", tags=["Login"])

class UserRegistration(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register_user(user: UserRegistration):
    hashed_password = get_password_hash(user.password)
    try:
        add_user(user.username, user.email, hashed_password)
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")

@router.post("/login")
async def login_user(login: UserLogin):
    user_data = get_user_by_username(login.username)
    if user_data and verify_password(login.password, user_data[1]):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

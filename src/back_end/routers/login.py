import sqlite3
from fastapi import APIRouter, HTTPException
from src.database.user_database.user_database import add_user,get_user_by_username
from src.back_end.security import get_password_hash, verify_password

router = APIRouter(prefix="/user", tags=["Login"])

@router.post("/register")
async def register_user(username: str, password: str, email: str):
    hashed_password = get_password_hash(password)
    try:
        add_user(username, email, hashed_password)
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")

@router.post("/login")
async def login_user(username: str, password: str):
    user_data = get_user_by_username(username)
    if user_data and verify_password(password, user_data[1]):
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

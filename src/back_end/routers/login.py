import sqlite3
from fastapi import APIRouter, HTTPException, Depends, Cookie
from starlette.responses import Response, JSONResponse

from src.database.user_database.user_database import create_table,add_user,get_user_by_username
from src.back_end.security import get_password_hash, verify_password
from src.back_end.models.userLogin import UserLogin, UserRegister
from pydantic import BaseModel

router = APIRouter(prefix="/user", tags=["Login"])

@router.post("/register")
async def register_user(user: UserRegister):
    create_table()
    hashed_password = get_password_hash(user.password)

    if user.username == "admin":
        user.role = "admin"  # Set role to admin if the username is admin

    try:
        add_user(user.username, user.email, hashed_password, user.role)
        return {"message": "User registered successfully"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")

@router.post("/login")
async def login_user(user_login: UserLogin):
    user = get_user_by_username(user_login.username)
    if not user or not verify_password(user_login.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    response = JSONResponse(content={"message": "Login successful"})
    if user["role"] == "admin":
        # Set a different token for the admin
        response.set_cookie(key="admin_token",
                            value=user_login.username,
                            httponly=True,
                            path="/admin"  # Modify the path as needed for admin-specific functionalities
                            )
    else:
        # Set a regular token for regular users
        response.set_cookie(key="user_token",
                            value=user_login.username,
                            httponly=True,
                            path="/"  # Set path for general user access
                            )
    return response
@router.get("/account")
async def get_account_info(session_token: str = Cookie(None)):
    if session_token:
        # Proceed with fetching user info or handling the account
        return {"message": "Account details retrieved successfully"}
    else:
        raise HTTPException(status_code=401, detail="Unauthorized access")

@router.post("/logout")
async def logout_user():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("user_token", path="/")
    response.delete_cookie("admin_token", path="/admin")
    response.delete_cookie("session_token", path="/")
    return response

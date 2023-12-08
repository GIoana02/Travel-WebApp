import sqlite3
from datetime import datetime, timedelta
from typing import Annotated

from jose import JWTError, jwt
from fastapi import APIRouter, HTTPException, Depends, Cookie, Request, Security
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from starlette import status
from starlette.responses import Response, JSONResponse

from src.database.user_database.user_database import create_table,add_user,get_user_by_username
from src.back_end.security import get_password_hash, verify_password, pwd_context, oauth2_scheme
from src.back_end.models.userLogin import UserLogin, UserRegister, Token
from pydantic import BaseModel

router = APIRouter(prefix="/user", tags=["Login"])
SECRET_KEY = 'I3ZHkhxYZQ2dSQGNsH3j5K38H'
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    if data.get("role") == "admin":
        to_encode.update({"isAdmin": True})
    else:
        to_encode.update({"isAdmin": False})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
def get_user(username: str):
    get_user_by_username(username)
    pass

# Function to authenticate and get the current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = {"sub": username}
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(username=token_data["sub"])
    if user is None:
        raise credentials_exception
    return user

async def authenticate_user(username: str, password: str):
    user = get_user_by_username(username)
    if user and verify_password(password, user["password"]):
        return user
    return None
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


# Login endpoint
@router.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)  # Await the async function call
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"], "role": user["role"]},
        expires_delta=access_token_expires
    )

    response = {"access_token": access_token, "token_type": "bearer"}
    return {"access_token": access_token, "token_type": "bearer"}


# Protected endpoint that requires role-based authorization
@router.get("/protected-route")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"message": "Access granted"}


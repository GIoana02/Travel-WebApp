from pydantic import BaseModel, Field


class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    role: str = Field("user", description="User role (optional, defaults to 'user')")
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

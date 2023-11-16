from pydantic import BaseModel
class UserLogin(BaseModel):
    user_id: int
    username: str
    email: str
    password: str
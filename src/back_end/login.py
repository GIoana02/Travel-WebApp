from pydantic import BaseModel


class UserCredentials(BaseModel):
    user: str
    password: str


def login(user: str, password: str):
    print (f"User added {user}, {password}")

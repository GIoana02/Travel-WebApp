from src.back_end.routers import login, flight, admin_router, frontend_images_routes, hotel, room, userAccount

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, File, UploadFile


app = FastAPI()
app.include_router(admin_router.router)
app.include_router(login.router)
app.include_router(hotel.router)
app.include_router(room.router)
app.include_router(flight.router)
app.include_router(userAccount.router)
app.include_router(frontend_images_routes.router)


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
@app.post("/upload")
async def receiveFile(file: UploadFile = File(...)):
    contents = await file.read()
    # Handle the file contents here (save it, process it, etc.)
    # For example:
    print(contents)
    return {"filename": file.filename}

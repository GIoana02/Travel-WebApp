import os

from fastapi import APIRouter, HTTPException, UploadFile, File
from starlette.responses import FileResponse

from src.database.image_database.image_db import get_image_url_by_name, add_image_info

router = APIRouter(prefix="/images", tags=["Images"])

IMAGES_DIRECTORY = "images"
@router.post("/upload-image")
async def upload_image(image: UploadFile = File(...), name: str = None):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)

        # Save the uploaded image to the 'images' directory
    image_path = os.path.join(IMAGES_DIRECTORY, image.filename)
    with open(image_path, "wb") as image_file:
        content = await image.read()
        image_file.write(content)
    # Save the image to a folder or cloud storage
    # For simplicity, let's assume the image is saved and we generate a URL
    image_url = f"/{IMAGES_DIRECTORY}/{image.filename}"

    # Save image information to the database
    add_image_info(name, image_url)
    return {"message": "Image uploaded successfully", "url": image_url}


@router.get("/get-image/{name}")
async def get_image_url(name: str):
    image_url = get_image_url_by_name(name)
    if image_url:
        return {"name": name, "url": image_url}
    else:
        raise HTTPException(status_code=404, detail="Image not found")

@router.get("/display-image/{name}")
async def display_image(name: str):
    image_url = get_image_url_by_name(name)
    if image_url:
        image_path = os.path.join(IMAGES_DIRECTORY, image_url.split('/')[-1])  # Extract filename from URL
        if os.path.exists(image_path):
            return FileResponse(image_path)
        else:
            raise HTTPException(status_code=404, detail="Image not found")
    else:
        raise HTTPException(status_code=404, detail="Image not found")
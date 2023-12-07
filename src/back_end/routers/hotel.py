import os

from fastapi import APIRouter, HTTPException, UploadFile, Form, File
from src.back_end.models.hotel import Hotel
from src.database.hotel_database.hotel_db import add_hotel,update_hotel_image_in_database, get_hotel_by_id, update_hotel, delete_hotel

router = APIRouter(prefix="/hotels", tags=["Hotels"])
IMAGES_DIRECTORY = "src/images/hotels_img"
@router.post("/")
async def create_hotel(hotel: Hotel):
    try:
        added_hotel_id = add_hotel(hotel)
        return {"message": f"Hotel {added_hotel_id} added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload_hotel_image/")
async def upload_image(image: UploadFile = File(...), name: str = Form(...)):
    image_url = save_uploaded_image(name, image)

    # Save image information to the database
    update_hotel_image_in_database(name, image_url)

    return {"message": "Image uploaded successfully", "url": image_url}
@router.get("/{hotel_id}")
async def get_hotel(hotel_name: str):
    hotel = get_hotel_by_id(hotel_name)
    if hotel:
        return hotel
    else:
        raise HTTPException(status_code=404, detail="Hotel not found")

@router.put("/{hotel_id}")
async def update_hotel_info(hotel_name: str, hotel: Hotel):
    try:
        updated = update_hotel(hotel_name, hotel)
        if updated:
            return {"message": f"Hotel {hotel_name} updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{hotel_id}")
async def delete_hotel_entry(hotel_name: str):
    try:
        deleted = delete_hotel(hotel_name)
        if deleted:
            return {"message": f"Hotel {hotel_name} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


image_counter = 1

def save_uploaded_image(hotel_name: str,hotel_image: UploadFile):
    global image_counter

    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)

    filename = f"{hotel_name}_photo_{image_counter}.{hotel_image.filename.split('.')[-1]}"
    image_path = os.path.join(IMAGES_DIRECTORY, filename)
    with open(image_path, "wb") as image_file:
        content = hotel_image.file.read()
        image_file.write(content)

    image_url = f"/{IMAGES_DIRECTORY}/{filename}"
    image_counter += 1
    return image_url

@router.get("/")
async def get_all_hotels():
    try:
        hotels = get_all_hotels()
        if hotels:
            return {"message": f"Hotels {hotels} fetched successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotels not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

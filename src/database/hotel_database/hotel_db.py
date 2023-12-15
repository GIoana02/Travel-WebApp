import sqlite3

DATABASE_NAME = "src/database/hotel_database/hotel_database.db"


def create_connection(DATABASE_NAME):
    try:
        connection = sqlite3.connect(DATABASE_NAME)
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to the database {e}")
    return None


def create_table():
    connection = create_connection(DATABASE_NAME)
    if connection is not None:
        try:
            cursor = connection.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS Hotels (
                    hotel_id INTEGER PRIMARY KEY,
                    hotel_name TEXT,
                    location_city TEXT,
                    location_state TEXT,
                    location_country TEXT,
                    address TEXT,
                    contact_phone TEXT,
                    contact_email TEXT,
                    description TEXT,
                    rating INTEGER,
                    checkin_time TIME,
                    checkout_time TIME,
                    amenities TEXT,
                    room_types TEXT,
                    room_prices TEXT,
                    images TEXT,
                    availability TEXT,
                    booking_info TEXT,
                    reviews TEXT
                )
            ''')

            connection.commit()
            cursor.close()
            print("Tables created successfully.")
        except sqlite3.Error as e:
            print(e)

    else:
        print("Error: Unable to create a database connection.")
    connection.close()


create_table()


def add_hotel(hotel):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        hotel_values = (
            hotel.hotel_name, hotel.location_city, hotel.location_state,
            hotel.location_country, hotel.address, hotel.contact_phone,
            hotel.contact_email, hotel.description, hotel.rating,
            hotel.checkin_time, hotel.checkout_time, hotel.amenities,
            hotel.room_types, hotel.room_prices, hotel.images,
            hotel.availability, hotel.booking_info, hotel.reviews
        
        )

        cursor.execute('''
            INSERT INTO Hotels (
                hotel_name, location_city, location_state, location_country,
                address, contact_phone, contact_email, description, rating,
                checkin_time, checkout_time, amenities, room_types, room_prices,
                images, availability, booking_info, reviews
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', hotel_values)

        connection.commit()
        print("Hotel added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding hotel: {e}")
    finally:
        cursor.close()
        connection.close()

def update_hotel_image_in_database(hotel_name: str, image_url: str):
    # Update the database with the new image URL
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE Hotels
        SET images = ?
        WHERE hotel_name = ?
    ''', (image_url, hotel_name))
    connection.commit()

    print("Hotel image URL updated in the database.")


def get_hotel_by_id(hotel_name):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    try:
        cursor.execute('''SELECT hotel_name, location_city, location_state, location_country,
                    address, contact_phone, contact_email, description, rating,
                    checkin_time, checkout_time, amenities, room_types, room_prices,
                    images, availability, booking_info, reviews FROM Hotels WHERE hotel_name=?''', (hotel_name,))
        hotel = cursor.fetchone()
        if hotel:
            print("Hotel found:",hotel)
            return hotel
        else:
            print("Hotel with hotel id '{}' not found.".format(hotel_name))
            return None
    except sqlite3.Error as e:
        print("Error fetching flight:", e)
        return None  # Return None in case of error
    finally:
        cursor.close()
        connection.close()

def update_hotel(hotel_name, new_hotel_data):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute('''
            UPDATE Hotels SET
            hotel_name=?, location_city=?, location_state=?, location_country=?,
            address=?, contact_phone=?, contact_email=?, description=?, rating=?,
            checkin_time=?, checkout_time=?, amenities=?, room_types=?, room_prices=?,
            images=?, availability=?, booking_info=?, reviews=?
            WHERE hotel_name=?
        ''', (
            new_hotel_data.hotel_name, new_hotel_data.location_city, new_hotel_data.location_state,
            new_hotel_data.location_country, new_hotel_data.address, new_hotel_data.contact_phone,
            new_hotel_data.contact_email, new_hotel_data.description, new_hotel_data.rating,
            new_hotel_data.checkin_time, new_hotel_data.checkout_time, new_hotel_data.amenities,
            new_hotel_data.room_types, new_hotel_data.room_prices, new_hotel_data.images,
            new_hotel_data.availability, new_hotel_data.booking_info, new_hotel_data.reviews,
            hotel_name
        ))

        connection.commit()
        print("Hotel updated successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error updating hotel: {e}")
        return False
    finally:
        connection.close()


def delete_hotel(hotel_name):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM Hotels WHERE hotel_name=?", (hotel_name,))
        connection.commit()
        print("Hotel deleted successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error deleting hotel: {e}")
        return False
    finally:
        cursor.close()
        connection.close()

def get_all_hotels_admin():
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    hotels = []
    try:
        cursor.execute("SELECT * FROM Hotels")
        #print("Fetching hotels successful.")
        hotels = cursor.fetchall()
        #return hotels
    except sqlite3.Error as e:
        print(f"Error fetching hotels: {e}")
        return None
    finally:
        cursor.close()
        connection.close()

def get_all_hotels():
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    hotels = []
    try:
        cursor.execute("SELECT * FROM Hotels")
        #print("Fetching hotels successful.")
        hotels = cursor.fetchall()
        #return hotels
    except sqlite3.Error as e:
        print(f"Error fetching hotels: {e}")
        return None
    finally:
        cursor.close()
        connection.close()
    return hotels
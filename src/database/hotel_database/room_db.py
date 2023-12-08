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
                CREATE TABLE IF NOT EXISTS Rooms (
                    room_id INTEGER PRIMARY KEY,
                    hotel_id INTEGER REFERENCES Hotels(hotel_id),
                    room_number TEXT,
                    room_type TEXT,
                    capacity INTEGER,
                    price REAL,
                    availability TEXT,
                    amenities TEXT,
                    description TEXT,
                    images TEXT
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


def add_room(room):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute('''
            INSERT INTO Rooms (
                hotel_id, room_number, room_type, capacity, price,
                availability, amenities, description, images
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            room.hotel_id, room.room_number, room.room_type, room.capacity,
            room.price, room.availability, room.amenities,
            room.description, room.images
        ))

        connection.commit()
        print("Room added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding room: {e}")
    finally:
        connection.close()


def get_room_by_id(room_id):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM Rooms WHERE room_id=?", (room_id,))
    room = cursor.fetchone()

    connection.close()
    return room


def update_room(room_id, new_room_data):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute('''
            UPDATE Rooms SET
            hotel_id=?, room_number=?, room_type=?, capacity=?, price=?,
            availability=?, amenities=?, description=?, images=?
            WHERE room_id=?
        ''', (
            new_room_data.hotel_id, new_room_data.room_number, new_room_data.room_type,
            new_room_data.capacity, new_room_data.price, new_room_data.availability,
            new_room_data.amenities, new_room_data.description, new_room_data.images,
            room_id
        ))

        connection.commit()
        print("Room updated successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error updating room: {e}")
        return False
    finally:
        connection.close()


def delete_room(room_id):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM Rooms WHERE room_id=?", (room_id,))
        connection.commit()
        print("Room deleted successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error deleting room: {e}")
        return False
    finally:
        connection.close()

def update_room_availability(room_id: int, availability: bool):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE Rooms
        SET availability = ?
        WHERE room_id = ?
    ''', (availability, room_id))
    connection.commit()
    print("Room availability updated successfully.")

def update_room_image_in_database(room_number: str, image_url: str):
    # Update the database with the new image URL
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE Rooms
        SET images = ?
        WHERE room_number = ?
    ''', (image_url, room_number))
    connection.commit()

    print("Room image URL updated in the database.")
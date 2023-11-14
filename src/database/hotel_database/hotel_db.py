import sqlite3

DATABASE_NAME = "hotel_database.db"
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
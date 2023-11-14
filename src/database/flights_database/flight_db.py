import sqlite3

DATABASE_NAME = "flights_database.db"
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
                    CREATE TABLE IF NOT EXISTS Flights (
                        flight_id INTEGER PRIMARY KEY,
                        airline TEXT,
                        flight_number TEXT,
                        departure_airport TEXT,
                        departure_city TEXT,
                        departure_time DATETIME,
                        arrival_airport TEXT,
                        arrival_city TEXT,
                        arrival_time DATETIME,
                        duration INTEGER,
                        price REAL,
                        available_seats INTEGER,
                        aircraft_type TEXT,
                        flight_class TEXT,
                        stopovers TEXT,
                        booking_info TEXT,
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
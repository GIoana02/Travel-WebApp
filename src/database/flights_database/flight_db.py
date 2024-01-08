import sqlite3

DATABASE_NAME = "src/database/flights_database/flights_database.db"
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
                        arrival_time TEXT,
                        duration TEXT,
                        price TEXT,
                        available_seats TEXT,
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

def add_flight(flight_data):
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        flight_values = (
            flight_data.airline,
            flight_data.flight_number,
            flight_data.departure_airport,
            flight_data.departure_city,
            flight_data.departure_time,
            flight_data.arrival_airport,
            flight_data.arrival_city,
            flight_data.arrival_time,
            flight_data.duration,
            flight_data.price,
            flight_data.available_seats,
            flight_data.aircraft_type,
            flight_data.flight_class,
            flight_data.stopovers,
            flight_data.booking_info,
            flight_data.images,
        )

        cursor.execute('''
                    INSERT INTO Flights (airline, flight_number, departure_airport, departure_city, departure_time, arrival_airport, arrival_city, arrival_time, duration, price, available_seats, aircraft_type, flight_class, stopovers, booking_info, images)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', flight_values)
        connection.commit()
        print("Flight added successfully.")
    except sqlite3.Error as e:
        print("Error adding flight:", e)
    finally:
        cursor.close()
        connection.close()

def delete_flight(flight_number):
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    try:

        cursor.execute('DELETE FROM Flights WHERE flight_number = ?', (flight_number,))
        connection.commit()
        print("Flight deleted successfully.")
    except sqlite3.Error as e:
        print("Error deleting flight:", e)
    finally:
        cursor.close()
        connection.close()

def update_flight(flight_id, flight_data):
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        flight_values = (
            flight_data.flight_id,
            flight_data.airline,
            flight_data.flight_number,
            flight_data.departure_airport,
            flight_data.departure_city,
            flight_data.departure_time,
            flight_data.arrival_airport,
            flight_data.arrival_city,
            flight_data.arrival_time,
            flight_data.duration,
            flight_data.price,
            flight_data.available_seats,
            flight_data.aircraft_type,
            flight_data.flight_class,
            flight_data.stopovers,
            flight_data.booking_info,
            flight_data.images,
        )
        cursor.execute('''
            UPDATE Flights
            SET flight_id = ?, airline = ?, flight_number = ?, departure_airport = ?, departure_city = ?, departure_time = ?, arrival_airport = ?, arrival_city = ?, arrival_time = ?, duration = ?, price = ?, available_seats = ?, aircraft_type = ?, flight_class = ?, stopovers = ?, booking_info = ?, images = ?
            WHERE flight_id = ?
        ''', (*flight_values, flight_id))
        connection.commit()
        print("Flight updated successfully.")
    except sqlite3.Error as e:
        print("Error updating flight:", e)
    finally:
        cursor.close()
        connection.close()

def get_flight_by_flight_number(flight_number):
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute('SELECT * FROM Flights WHERE flight_number = ?', (flight_number,))
        flight = cursor.fetchone()
        if flight:
            print("Flight found:", flight)
            return flight  # Return the flight data when found
        else:
            print("Flight with flight number '{}' not found.".format(flight_number))
            return None  # Return None if flight not found
    except sqlite3.Error as e:
        print("Error fetching flight:", e)
        return None  # Return None in case of error
    finally:
        cursor.close()
        connection.close()


def get_all_flights():
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    flights = []

    try:
        cursor.execute('SELECT * FROM Flights')
        flights = cursor.fetchall()
    except sqlite3.Error as e:
        print("Error fetching flights:", e)
    finally:
        cursor.close()
        connection.close()

    return flights

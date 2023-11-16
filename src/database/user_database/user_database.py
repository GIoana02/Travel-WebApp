import os
import sqlite3
import os

DATABASE_NAME = "src/database/user_database/user.db"

def create_connection():
    try:
        connection = sqlite3.connect(DATABASE_NAME)
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to the database: {e}")
    return None


def create_table():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS UserInfo (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    email TEXT NULL,
                    password TEXT NOT NULL
                )
            ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS PreviousTrips (
                                trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                destination TEXT,
                                dates TEXT,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(user_email)
                            )
                        ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS FavoriteFlights (
                                favorite_flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                flight_id INTEGER,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(user_email)
                            )
                        ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS FavoriteHotels (
                                favorite_hotel_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                hotel_id INTEGER,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(user_email)
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


def add_user(username: str, email: str, password: str):
    connection = create_connection()
    try:
        cursor = connection.cursor()

        cursor.execute("INSERT INTO UserInfo (username, email, password) VALUES (?, ?, ?)", (username, email, password))
        connection.commit()
        print("User added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding user: {e}")
    connection.close()


def get_user_by_username(username: str):
    connection = create_connection()
    try:
        cursor = connection.cursor()

        cursor.execute("SELECT id, password FROM UserInfo WHERE username = ?", (username,))
        return cursor.fetchone()
    except sqlite3.Error as e:
        print(f"Error retrieving user: {e}")
    connection.close()


def get_user_info(email: str):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM UserInfo WHERE user_email=?", (email,))
        user_info = cursor.fetchone()
        if user_info:
            return user_info
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving user info: {e}")
        return None
    finally:
        connection.close()


def get_previous_trips(email: str):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM PreviousTrips WHERE user_email=?", (email,))
        trips = cursor.fetchall()
        if trips:
            return trips
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving previous trips: {e}")
        return None
    finally:
        connection.close()


def get_favorite_flights(email: str):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM FavoriteFlights WHERE user_email=?", (email,))
        favorite_flights = cursor.fetchall()
        if favorite_flights:
            return favorite_flights
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving favorite flights: {e}")
        return None
    finally:
        connection.close()


def get_favorite_hotels(email: str):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM FavoriteHotels WHERE user_email=?", (email,))
        favorite_hotels = cursor.fetchall()
        if favorite_hotels:
            return favorite_hotels
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving favorite hotels: {e}")
        return None
    finally:
        connection.close()

def delete_favorite_flight(email: str, favorite_flight_id: int):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM FavoriteFlights WHERE user_email=? AND favorite_flight_id=?", (email, favorite_flight_id))
        connection.commit()
        return True
    except sqlite3.Error as e:
        print(f"Error deleting favorite flight: {e}")
        return False
    finally:
        connection.close()

# Function to delete favorite hotel for a user
def delete_favorite_hotel(email: str, favorite_hotel_id: int):
    connection = create_connection(DATABASE_NAME)
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM FavoriteHotels WHERE user_email=? AND favorite_hotel_id=?", (email, favorite_hotel_id))
        connection.commit()
        return True
    except sqlite3.Error as e:
        print(f"Error deleting favorite hotel: {e}")
        return False
    finally:
        connection.close()

create_table()
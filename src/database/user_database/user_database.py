import json
import sqlite3


DATABASE_NAME = "src/database/user_database/user"

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
                    password TEXT NOT NULL,
                    role_user TEXT
                )
            ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS PreviousTrips (
                                trip_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                destination TEXT,
                                dates TEXT,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(email)
                            )
                        ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS FavoriteFlights (
                                favorite_flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                flight_id INTEGER,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(email)
                            )
                        ''')

            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS FavoriteHotels (
                                favorite_hotel_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                hotel_id INTEGER,
                                FOREIGN KEY (user_email) REFERENCES UserInfo(email)
                            )
                        ''')
            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS Reservations (
                                reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                reservation_details TEXT,
                                user_email TEXT,
                                status TEXT DEFAULT 'not finalized',
                                FOREIGN KEY (user_email) REFERENCES UserInfo(email)
                            )
                        ''')
            cursor.execute('''
                            CREATE TABLE IF NOT EXISTS Cart (
                                cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                user_email TEXT,
                                reservation_id INTEGER,
                                FOREIGN KEY (reservation_id) REFERENCES Reservations(reservation_id),
                                FOREIGN KEY (user_email) REFERENCES UserInfo(email)
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


def add_user(username: str, email: str, password: str, role: str):
    connection = create_connection()
    try:
        cursor = connection.cursor()

        cursor.execute("INSERT INTO UserInfo (username, email, password, role_user) VALUES (?, ?, ?,?)", (username, email, password, role))
        connection.commit()
        print("User added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding user: {e}")
    connection.close()


def get_user_by_username(username: str):
    connection = create_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id, email, username, password, role_user FROM UserInfo WHERE username = ?", (username,))
        print("User login successfully.")
        user_data = cursor.fetchone()
        if user_data:
            user_info = {
                "id": user_data[0],
                "email": user_data[1],
                "username": user_data[2],
                "password": user_data[3],
                "role": user_data[4]
            }
            print(user_info)
            return user_info
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving user: {e}")
    finally:
        connection.close()


def get_user_info(email: str):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM UserInfo WHERE email=?", (email,))
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
    connection = create_connection()
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
    connection = create_connection()
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
    connection = create_connection()
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
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM FavoriteFlights WHERE user_email=? AND flight_id=?", (email, favorite_flight_id))
        connection.commit()
        return True
    except sqlite3.Error as e:
        print(f"Error deleting favorite flight: {e}")
        return False
    finally:
        connection.close()

# Function to delete favorite hotel for a user
def delete_favorite_hotel(email: str, favorite_hotel_name: int):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM FavoriteHotels WHERE user_email=? AND hotel_id=?", (email, favorite_hotel_name))
        connection.commit()
        return True
    except sqlite3.Error as e:
        print(f"Error deleting favorite hotel: {e}")
        return False
    finally:
        connection.close()

def update_user_role_to_admin(username):
    connection = create_connection()
    cursor = connection.cursor()
    try:
        # Update the role of the user with the given username to 'admin'
        cursor.execute("UPDATE users SET role = ? WHERE username = ?", ("admin", username))
        connection.commit()
    except sqlite3.Error as e:
        print(f"Error updating user role: {e}")

create_table()

def get_all_reservations_admin():
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM Reservations")
        print("Fetching all reservations successful.")
        reservations = cursor.fetchall()
        return reservations
    except sqlite3.Error as e:
        print(f"Error fetching reservations: {e}")
        return None
    finally:
        connection.close()

def update_reservation_admin(reservation_id, new_details):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("UPDATE Reservations SET reservation_details = ? WHERE reservation_id = ?",
                       (new_details, reservation_id))
        connection.commit()
        print("Reservation updated successfully.")
    except sqlite3.Error as e:
        print(f"Error updating reservation: {e}")
    finally:
        connection.close()

def delete_reservation_admin(reservation_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM Reservations WHERE reservation_id = ?", (reservation_id,))
        connection.commit()
        print("Reservation deleted successfully.")
    except sqlite3.Error as e:
        print(f"Error deleting reservation: {e}")
    finally:
        connection.close()

def get_user_reservations(user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT * FROM Reservations WHERE user_email = ?", (user_email,))
        print("Fetching user reservations successful.")
        reservations = cursor.fetchall()
        return reservations
    except sqlite3.Error as e:
        print(f"Error fetching user reservations: {e}")
        return None
    finally:
        connection.close()

def add_reservation_user(reservation_details, user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO Reservations (reservation_details, user_email) VALUES (?, ?)",
                       (reservation_details, user_email))
        connection.commit()
        print("Reservation added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding reservation: {e}")
    finally:
        connection.close()


def update_reservation_user(reservation_id, user_email, new_details):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        # Check if the reservation belongs to the user
        cursor.execute("SELECT * FROM Reservations WHERE reservation_id = ? AND user_email = ?",
                       (reservation_id, user_email))
        reservation = cursor.fetchone()

        if reservation:
            cursor.execute("UPDATE Reservations SET reservation_details = ? WHERE reservation_id = ?",
                           (new_details, reservation_id))
            connection.commit()
            print("Reservation updated successfully.")
        else:
            print("No reservation found for the given ID and user email.")
    except sqlite3.Error as e:
        print(f"Error updating reservation: {e}")
    finally:
        connection.close()

def delete_reservation_user(reservation_id, user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        # Check if the reservation belongs to the user
        cursor.execute("SELECT * FROM Reservations WHERE reservation_id = ? AND user_email = ?",
                       (reservation_id, user_email))
        reservation = cursor.fetchone()

        if reservation:
            cursor.execute("DELETE FROM Reservations WHERE reservation_id = ?", (reservation_id,))
            connection.commit()
            print("Reservation deleted successfully.")
        else:
            print("No reservation found for the given ID and user email.")
    except sqlite3.Error as e:
        print(f"Error deleting reservation: {e}")
    finally:
        connection.close()

def add_reservation_admin(reservation_details, user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        reservation_details_json = json.dumps(reservation_details)
        cursor.execute("INSERT INTO Reservations (reservation_details, user_email) VALUES (?, ?)",
                       (reservation_details_json, user_email))
        connection.commit()
        new_reservation_id = cursor.lastrowid  # Get the last inserted ID
        print("Reservation added successfully by admin.")
        return new_reservation_id  # Return the new reservation ID
    except sqlite3.Error as e:
        print(f"Error adding reservation: {e}")
        return None
    finally:
        connection.close()


def get_reservation_by_id(reservation_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT reservation_id, reservation_details, user_email FROM Reservations WHERE reservation_id = ?", (reservation_id,))
        row = cursor.fetchone()
        if row:
            # Convert the JSON string back to a dictionary
            reservation_details = json.loads(row[1])
            return {
                "reservation_id": row[0],
                "reservation_details": reservation_details,
                "user_email": row[2]
            }
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error fetching reservation: {e}")
        return None
    finally:
        connection.close()


def get_cart_items(user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT reservation_id FROM Cart WHERE user_email = ?", (user_email,))
        cart_items_ids = cursor.fetchall()
        cart_items = []
        for (reservation_id,) in cart_items_ids:
            cursor.execute("SELECT * FROM Reservations WHERE reservation_id = ?", (reservation_id,))
            reservation_row = cursor.fetchone()
            if reservation_row:
                # Assuming reservation_row[1] is the JSON string of reservation_details
                reservation_details = json.loads(reservation_row[1])
                cart_items.append({
                    "reservation_id": reservation_row[0],
                    "reservation_details": reservation_details,
                    # Add other fields as necessary
                })
                print(cart_items)
        return cart_items
    except sqlite3.Error as e:
        print(f"Error fetching cart items: {e}")
        return None
    finally:
        connection.close()

def add_to_cart(user_email, reservation_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO Cart (user_email, reservation_id) VALUES (?, ?)",
                       (user_email, reservation_id))
        connection.commit()
        print("Added to cart successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error adding to cart: {e}")
        return False
    finally:
        connection.close()

def remove_from_cart(cart_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("DELETE FROM Cart WHERE cart_id = ?", (cart_id,))
        connection.commit()
        print("Removed from cart successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error removing from cart: {e}")
        return False
    finally:
        connection.close()

def update_reservation_status(reservation_id, new_status):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("UPDATE Reservations SET status = ? WHERE reservation_id = ?",
                       (new_status, reservation_id))
        connection.commit()
        print("Reservation status updated successfully.")
    except sqlite3.Error as e:
        print(f"Error updating reservation status: {e}")
        return None
    finally:
        connection.close()

def finalize_reservation(cart_id, user_email):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        # Retrieve the reservation ID from the cart
        cursor.execute("SELECT reservation_id FROM Cart WHERE cart_id = ?", (cart_id,))
        reservation_id = cursor.fetchone()
        if reservation_id:
            reservation_id = reservation_id[0]

            # Update the reservation status to 'finalized'
            cursor.execute("UPDATE Reservations SET status = 'finalized' WHERE reservation_id = ?", (reservation_id,))

            # Remove the reservation from the cart
            cursor.execute("DELETE FROM Cart WHERE cart_id = ?", (cart_id,))

            connection.commit()
            print("Reservation finalized successfully.")
            return reservation_id
        else:
            print("Reservation not found in the cart.")
            return None
    except sqlite3.Error as e:
        print(f"Error finalizing reservation: {e}")
        return None
    finally:
        connection.close()

def add_favorite_flight(user_email, flight_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO FavoriteFlights (user_email, flight_id) VALUES (?, ?)",
                       (user_email, flight_id))
        connection.commit()
        print("Favorite flight added successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error adding favorite flight: {e}")
        return False
    finally:
        connection.close()

def add_favorite_hotel(user_email, hotel_id):
    connection = create_connection()
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO FavoriteHotels (user_email, hotel_id) VALUES (?, ?)",
                       (user_email, hotel_id))
        connection.commit()
        print("Favorite hotel added successfully.")
        return True
    except sqlite3.Error as e:
        print(f"Error adding favorite hotel: {e}")
        return False
    finally:
        connection.close()

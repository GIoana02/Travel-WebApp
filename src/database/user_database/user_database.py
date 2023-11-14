import sqlite3

DATABASE_NAME = "src/database/user_database/user_database.db"
def create_connection():
    try:
        connection = sqlite3.connect(DATABASE_NAME)
        return connection
    except sqlite3.Error as e:
        print(f"Error connecting to the database {e}")
    return None

def create_table():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    email TEXT NULL,
                    password TEXT NOT NULL
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

        cursor.execute("INSERT INTO Users (username, email, password) VALUES (?, ?, ?)", (username, email, password))
        connection.commit()
        print("User added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding user: {e}")
    connection.close()
def get_user_by_username(username: str):
    connection = create_connection()
    try:
        cursor = connection.cursor()

        cursor.execute("SELECT id, password FROM Users WHERE username = ?", (username,))
        return cursor.fetchone()
    except sqlite3.Error as e:
        print(f"Error retrieving user: {e}")
    connection.close()

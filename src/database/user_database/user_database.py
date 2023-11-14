import sqlite3

DATABASE_NAME = "user_database.db"
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
                CREATE TABLE IF NOT EXISTS Users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    email TEXT NOT NULL,
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

create_table()
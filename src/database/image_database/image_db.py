import sqlite3

DATABASE_NAME = "src/database/image_database/image.db"


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
                CREATE TABLE IF NOT EXISTS images (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT UNIQUE,
                    url TEXT
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

def add_image_info(name: str, url: str):
    connection = create_connection(DATABASE_NAME)
    try:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO images (name, url) VALUES (?, ?)", (name, url))
        connection.commit()
        print("Image information added successfully.")
    except sqlite3.Error as e:
        print(f"Error adding image information: {e}")
    finally:
        connection.close()

# Function to get image URL by name
def get_image_url_by_name(name: str):
    connection = create_connection(DATABASE_NAME)
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT url FROM images WHERE name=?", (name,))
        result = cursor.fetchone()
        if result:
            return result[0]
        else:
            return None
    except sqlite3.Error as e:
        print(f"Error retrieving image URL: {e}")
    finally:
        connection.close()
import mysql.connector
from mysql.connector import errorcode


def connect_to_db(host, user, password, database):
    db = mysql.connector.connect(
        host=host, user=user, password=password, database=database
    )
    return db


def create_table(cursor, table_name, stmt):
    try:
        print(f"Creating table {table_name}...")
        cursor.execute(stmt)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print(f"Table {table_name} already exists.")
        else:
            print(err.msg)
    else:
        print("OK")


def drop_table(cursor, table_name):
    try:
        print(f"Dropping table {table_name}...")
        cursor.execute(f"DROP TABLE IF EXISTS {table_name }")
    except mysql.connector.Error as err:
        print(err.msg)
    else:
        print("OK")


# TODO(danom): generalize this to add any record to any table
def insert_record(cnx, cursor, record):
    select_poet = f"""SELECT id FROM poet WHERE pf_url=%(pf_url)s;"""

    insert_poet = (
        f"""INSERT INTO poet """
        f"""(name, yob, yod, img_url, bio, pf_url) """
        f"""VALUES (%s, %s, %s, %s, %s, %s);"""
    )

    try:
        cursor.execute(select_poet, {"pf_url": record["pf_url"]})
        res = cursor.fetchall()

        if len(res) == 0:
            print("Inserting new record...")
            cursor.execute(
                insert_poet,
                (
                    record["name"],
                    record["yob"],
                    record["yod"],
                    record["image"],
                    record["bio"],
                    record["pf_url"],
                ),
            )
            cnx.commit()
        else:
            print("Record already exists.")
    except mysql.connector.Error as err:
        print(err.msg)
    else:
        print("OK")

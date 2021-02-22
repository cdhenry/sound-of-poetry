import json
import os

from scripts.scrape_poet import scrape_poet
from scripts.database import *


_DB_HOST = os.environ["SOP_DEV_HOST"]
_DB_USER = "danom"
_DB_PASSWORD = os.environ["MYSQL_PW"]
_DB_NAME = "sop_dev"

_CREATE_POET_STMT = (
    f"CREATE TABLE poet ("
    "id INT NOT NULL AUTO_INCREMENT, "
    "name VARCHAR(255) NOT NULL, "
    "yob int, "
    "yod int, "
    "img_url VARCHAR(255), "
    "bio  MEDIUMTEXT NULL, "
    "pf_url VARCHAR(255) NOT NULL, "
    "PRIMARY KEY (id));"
)

_CREATE_REGION_STMT = (
    f"CREATE TABLE region ("
    "id INT NOT NULL AUTO_INCREMENT, "
    "name VARCHAR(255) NOT NULL, "
    "PRIMARY KEY (id));"
)

_CREATE_SCHOOL_STMT = (
    f"CREATE TABLE school ("
    "id INT NOT NULL AUTO_INCREMENT, "
    "name VARCHAR(255) NOT NULL, "
    "PRIMARY KEY (id));"
)

_CREATE_ISFROM_STMT = (
    f"CREATE TABLE isfrom ("
    "poet_id INT NOT NULL,"
    "region_id INT NOT NULL,"
    "PRIMARY KEY (poet_id, region_id),"
    "FOREIGN KEY (poet_id) REFERENCES poet(id),"
    "FOREIGN KEY (region_id) REFERENCES region(id));"
)

_CREATE_INSCHOOL_STMT = (
    f"CREATE TABLE inschool ("
    "poet_id INT NOT NULL,"
    "school_id INT NOT NULL,"
    "PRIMARY KEY (poet_id, school_id),"
    "FOREIGN KEY (poet_id) REFERENCES poet(id),"
    "FOREIGN KEY (school_id) REFERENCES school(id));"
)


def main():
    db_cnx = get_db_cnx()
    cursor = db_cnx.cursor()

    # drop table
    drop_table(cursor, 'region')
    drop_table(cursor, 'school')
    drop_table(cursor, 'isfrom')
    drop_table(cursor, 'inschool')

    # create table
    create_table(cursor, "region", _CREATE_REGION_STMT)
    create_table(cursor, "school", _CREATE_SCHOOL_STMT)
    create_table(cursor, "isfrom", _CREATE_ISFROM_STMT)
    create_table(cursor, "inschool", _CREATE_INSCHOOL_STMT)

    # with open("data/poet_urls.txt", "r") as f:
    #     poet_urls = f.readlines()
    #
    # for url in poet_urls:
    #     # scrape poet's page's html
    #     poet = process_poet(url)
    #     # insert poet into db
    #     insert_record(db_cnx, cursor, poet)
    all_regions = []
    all_schools = []
    poet_regions = {}
    poet_schools = {}
    select_poet_stmt = f"""SELECT name FROM poet WHERE id=%s;"""

    for i in range(1, 4650):
        cursor.execute(select_poet_stmt, (i,))
        poet_name = cursor.fetchone()[0]
        file_name = "-".join(poet_name.split(" ")).lower()
        with open(f"data/{file_name}.json", 'r') as p_file:
            poet_json = json.load(p_file)
        if 'attrs' in poet_json.keys():
            if 'Region:' in poet_json['attrs'].keys():
                regions = poet_json['attrs']['Region:']
                for region in regions:
                    print(f"Inserting: {poet_name} -> {region}")
                    cursor.execute(f"""SELECT id FROM region """
                                   f"""WHERE name=%(name)s;""", {'name': region})
                    region_id = cursor.fetchone()[0]
                    cursor.execute(f"""INSERT INTO isfrom (poet_id, region_id) """
                                   f"""VALUES (%s, %s);""", (i, region_id))
                    db_cnx.commit()
            if 'School/Period:' in poet_json['attrs'].keys():
                schools = poet_json['attrs']['School/Period:']
                for school in schools:
                    print(f"Inserting: {poet_name} -> {school}")
                    cursor.execute(f"""SELECT id FROM school """
                                   f"""WHERE name=%(name)s;""", {'name': school})
                    school_id = cursor.fetchone()[0]
                    cursor.execute(f"""INSERT INTO inschool (poet_id, school_id) """
                                   f"""VALUES (%s, %s);""", (i, school_id))
                    db_cnx.commit()




    cursor.close()


def get_db_cnx():
    # establish a connection with the database
    # and create a cursor
    return connect_to_db(_DB_HOST, _DB_USER, _DB_PASSWORD, _DB_NAME)


def process_poet(url):
    # scrape poet's page's html
    poet = scrape_poet(url.strip("\n"))
    poet_name = poet["name"].lower().split(" ")
    file_name = "-".join(poet_name)
    with open(f"data/{file_name}.json", "w") as p_file:
        print(f"writing file: {file_name}.json")
        p_file.write(json.dumps(poet).__str__())
    return poet


if __name__ == "__main__":
    main()
    # db_cnx = get_db_cnx()
    # cursor = db_cnx.cursor()
    # poet = process_poet("https://www.poetryfoundation.org/poets/asiya-wadud")
    # insert_record(db_cnx, cursor, poet)

from app.models import db, Hospital, environment, SCHEMA
from sqlalchemy.sql import text


def seed_hospitals():
    hospital1 = Hospital(
        name="Delnor Hospital",
        address="300 S Randall Rd",
        city="Geneva",
        state="IL",
        country="United States",
        lat=41.8864515237608,
        lng=-88.34366621534213
        )
    hospital2 = Hospital(
        name="Mayo Clinic",
        address="200 1st St SW",
        city="Rochester",
        state="MN",
        country="United States",
        lat=44.02263721653067,
        lng=-92.46689262377024
        )
    hospital3 = Hospital(
        name="University of Illinois Hospital",
        address="1740 W Taylor St",
        city="Chicago",
        state="IL",
        country="United States", 
        lat=41.86949845275002,
        lng=-87.67057097327594
        )
    hospital4 = Hospital(
        name="Plainsboro Teaching Hospital",
        address="1000 New Jersey Route 33",
        city="Plainsboro",
        state="New Jersey",
        country="United States",
        lat=40.2221,
        lng=74.7208
    )
    hospital5 = Hospital(
        name="Sacred Heart Hospital",
        address="123 Street",
        city="San DiFrangeles",
        state="California",
        country="United States",
        lat=0,
        lng=0
    )
    hospital6 = Hospital(
        name="Grey Sloan Memorial Hospital",
        address="1600 E Jefferson St",
        city="Seattle",
        state="Washington",
        country="United States",
        lat=47.6080,
        lng=122.3350
    )
    hospital7 = Hospital(
        name="Chatham Family Medicine",
        address="492 Main St",
        city="Chatham",
        state="New Jersey",
        country="United States",
        lat=40.744990043691935,
        lng=-74.39174027213807
    )
    hospital8 = Hospital(
        name="County General Hospital",
        address="1950 W Polk St",
        city="Chicago",
        state="Illinois",
        country="United States",
        lat=41.8719,
        lng=87.6692
    )
    hospital9 = Hospital(
        name="Skin Physicians & Surgeons",
        address="859 E Foothill Blvd Ste B",
        city="Upland",
        state="California",
        country="United States",
        lat=0,
        lng=0
    )
    hospital10 = Hospital(
        name="Chicago University",
        address="5801 S Ellis Ave",
        city="Chicago",
        state="Illinois",
        country="United States",
        lat=41.78860862207979,
        lng=-87.59871541839603
    )
    hospital11 = Hospital(
        name="Metro-General Hospital",
        address="479 W 58th Street",
        city="New York City",
        state="New York",
        country="United States",
        lat=40.769616831349076,
        lng=-73.98762823558242
    )
    # hospital12 = Hospital(
    #     name="",
    #     address="",
    #     city="",
    #     state="",
    #     country="",
    #     lat=0,
    #     lng=0
    # )


    db.session.add(hospital1)
    db.session.add(hospital2)
    db.session.add(hospital3)
    db.session.add(hospital4)
    db.session.add(hospital5)
    db.session.add(hospital6)
    db.session.add(hospital7)
    db.session.add(hospital8)
    db.session.add(hospital9)
    db.session.add(hospital10)
    db.session.add(hospital11)
    db.session.commit()


def undo_hospitals():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.hospitals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM hospitals"))

    db.session.commit()

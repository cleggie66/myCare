from app.models import db, Hospital, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_hospitals():
    hospital1 = Hospital(
        name="Delnor Hospital", address="300 S Randall Rd", city="Geneva", state="IL", country="United States", lat=41.8864515237608, lng=-88.34366621534213)
    hospital2 = Hospital(
        name="Mayo Clinic", address="200 1st St SW", city="Rochester", state="MN", country="United States", lat=44.02263721653067, lng=-92.46689262377024)
    hospital3 = Hospital(
        name="University of Illinois Hospital", address="1740 W Taylor St", city="Chicago", state="IL", country="United States", lat=41.86949845275002, lng=-87.67057097327594)


    db.session.add(hospital1)
    db.session.add(hospital2)
    db.session.add(hospital3)
    db.session.commit()


def undo_hospitals():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.hospitals RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM hospitals"))

    db.session.commit()

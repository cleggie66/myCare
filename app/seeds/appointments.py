from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_appointments():
    appointment1 = Appointment(
        patient_id=1, physician_id=1, hospital_id=1, reason_for_visit="sore throat", start_time=datetime(2019, 5, 15, 17, 8), end_time=datetime(2019, 5, 15, 18, 8))
    appointment2 = Appointment(
        patient_id=1, physician_id=2, hospital_id=1, reason_for_visit="flu symptoms", start_time=datetime(2019, 6, 2, 19, 36), end_time=datetime(2019, 6, 2, 20, 36))
    appointment3 = Appointment(
        patient_id=1, physician_id=3, hospital_id=1, reason_for_visit="ear ache", start_time=datetime(2019, 7, 10, 17, 3), end_time=datetime(2019, 7, 10, 18, 3))

    db.session.add(appointment1)
    db.session.add(appointment2)
    db.session.add(appointment3)
    db.session.commit()


def undo_appointments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))

    db.session.commit()


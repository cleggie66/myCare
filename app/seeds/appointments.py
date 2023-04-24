from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_appointments():
    appointment1 = Appointment(
        patient_id=3, physician_id=1, hospital_id=1, reason_for_visit="sore throat", start_time="2023-05-15T21:12", end_time="2023-05-15T22:12")
    appointment2 = Appointment(
        patient_id=2, physician_id=2, hospital_id=2, reason_for_visit="flu symptoms", start_time="2023-06-16T21:12", end_time="2023-06-16T22:12")
    appointment3 = Appointment(
        patient_id=1, physician_id=3, hospital_id=3, reason_for_visit="ear ache", start_time="2023-07-15T21:12", end_time="2023-07-15T22:12")

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


from app.models import db, Appointment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_appointments():
    appointment1 = Appointment(
        patient_id=1, 
        physician_id=6,
        hospital_id=4, 
        reason_for_visit="I've been experiencing persistent headaches and I'm not sure what's causing them.", 
        start_time="2023-05-15T14:00", 
        end_time="2023-05-15T15:00"
        )
    appointment2 = Appointment(
        patient_id=1, 
        physician_id=4, 
        hospital_id=6, 
        reason_for_visit="I have a painful rash on my arm that I think might be infected.", 
        start_time="2023-06-16T13:00",
        end_time="2023-06-16T14:00"
        )
    appointment3 = Appointment(
        patient_id=1,
        physician_id=7, 
        hospital_id=8, 
        reason_for_visit="I've been feeling extremely tired and fatigued lately, even after getting plenty of sleep.", 
        start_time="2023-11-28T09:00", 
        end_time="2023-11-28T10:00"
        )
    appointment4 = Appointment(
        patient_id=1,
        physician_id=13,
        hospital_id=6,
        reason_for_visit="IDK I just really need surgery on something I guess",
        start_time="2023-11-11T14:00",
        end_time="2023-11-11T15:00"
        )
    appointment5 = Appointment(
        patient_id=1,
        physician_id=1,
        hospital_id=6,
        reason_for_visit="I think I might have a sinus infection, as I'm experiencing congestion and pressure in my sinuses.",
        start_time="2024-01-12T09:00",
        end_time="2024-01-12T10:00"
        )
    appointment6 = Appointment(
        patient_id=1,
        physician_id=2,
        hospital_id=7,
        reason_for_visit="I've been having trouble sleeping and would like to discuss possible treatment options with my doctor.",
        start_time="2023-11-05T11:00",
        end_time="2023-11-05T12:00"
        )
    appointment7 = Appointment(
        patient_id=1,
        physician_id=3,
        hospital_id=5,
        reason_for_visit="I've been experiencing pain in my knee and I'm not sure if it's due to an injury or something else.",
        start_time="2024-02-26T13:00",
        end_time="2024-02-26T14:00"
        )
    appointment8 = Appointment(
        patient_id=1,
        physician_id=5,
        hospital_id=8,
        reason_for_visit="I'm experiencing abdominal pain and bloating and would like to get checked out.",
        start_time="2023-12-02T14:00",
        end_time="2023-12-02T15:00"
        )
    appointment9 = Appointment(
        patient_id=1,
        physician_id=7,
        hospital_id=8,
        reason_for_visit="I think I might have a urinary tract infection, as I'm experiencing painful urination and frequent urges to go.",
        start_time="2023-09-10T10:00",
        end_time="2023-09-10T11:00"
        )
    appointment10 = Appointment(
        patient_id=1,
        physician_id=9,
        hospital_id=5,
        reason_for_visit="I have a persistent cough and would like to make sure it's not something more serious.",
        start_time="2023-04-15T21:00",
        end_time="2023-04-15T22:00"
        )
    appointment11 = Appointment(
        patient_id=1,
        physician_id=8,
        hospital_id=6,
        reason_for_visit="I'm experiencing chest pain and would like to get checked out to make sure it's not a heart issue.",
        start_time="2023-04-08T13:00",
        end_time="2023-04-08T14:00"
        )
    appointment12 = Appointment(
        patient_id=1,
        physician_id=10,
        hospital_id=9,
        reason_for_visit="I've noticed a lump in my breast and would like to get it checked out to make sure it's not cancerous.",
        start_time="2023-10-15T15:00",
        end_time="2023-10-15T16:00"
        )
    appointment13 = Appointment(
        patient_id=1,
        physician_id=11,
        hospital_id=4,
        reason_for_visit="I've been experiencing digestive issues, including diarrhea and vomiting, and would like to get checked out.",
        start_time="2024-01-02T09:00",
        end_time="2024-01-02T19:00"
        )
    appointment14 = Appointment(
        patient_id=1,
        physician_id=14,
        hospital_id=2,
        reason_for_visit="I'm experiencing a lot of anxiety and would like to talk to someone about it.",
        start_time="2023-08-22T08:00",
        end_time="2023-08-22T09:00"
        )
    appointment15 = Appointment(
        patient_id=1,
        physician_id=6,
        hospital_id=4,
        reason_for_visit="I've been experiencing hearing loss and would like to get my hearing checked.",
        start_time="2023-12-28T13:00",
        end_time="2023-12-28T14:00"
        )

    db.session.add(appointment1)
    db.session.add(appointment2)
    db.session.add(appointment3)
    db.session.add(appointment4)
    db.session.add(appointment5)
    db.session.add(appointment6)
    db.session.add(appointment7)
    db.session.add(appointment8)
    db.session.add(appointment9)
    db.session.add(appointment10)
    db.session.add(appointment11)
    db.session.add(appointment12)
    db.session.add(appointment13)
    db.session.add(appointment14)
    db.session.add(appointment15)
    db.session.commit()


def undo_appointments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.appointments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM appointments"))

    db.session.commit()


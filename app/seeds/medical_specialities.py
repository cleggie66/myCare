from app.models import db, MedicalSpeciality, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_medical_specialities():
    medical_speciality1 = MedicalSpeciality(
        name="Pediatrics", description="The branch of medicine dealing with the health and medical care of infants, children, and adolescents from birth up to the age of 18")
    medical_speciality2 = MedicalSpeciality(
        name="Anesthesiology", description="The medical specialty concerned with the total perioperative care of patients before, during and after surgery.")
    medical_speciality3 = MedicalSpeciality(
        name="Family Medicine", description="The medical specialty within primary care that provides continuing and comprehensive health care for the individual and family across all ages, genders, diseases, and parts of the body.")

    db.session.add(medical_speciality1)
    db.session.add(medical_speciality2)
    db.session.add(medical_speciality3)
    db.session.commit()


def undo_medical_specialities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.medical_specialities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medical_specialities"))

    db.session.commit()

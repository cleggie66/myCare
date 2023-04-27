from app.models import db, MedicalSpecialty, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medical_specialties():
    medical_specialty1 = MedicalSpecialty(
        name="Pediatrics", description="The branch of medicine dealing with the health and medical care of infants, children, and adolescents from birth up to the age of 18")
    medical_specialty2 = MedicalSpecialty(
        name="Anesthesiology", description="The medical specialty concerned with the total perioperative care of patients before, during and after surgery.")
    medical_specialty3 = MedicalSpecialty(
        name="Family Medicine", description="The medical specialty within primary care that provides continuing and comprehensive health care for the individual and family across all ages, genders, diseases, and parts of the body.")

    db.session.add(medical_specialty1)
    db.session.add(medical_specialty2)
    db.session.add(medical_specialty3)
    db.session.commit()


def undo_medical_specialties():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.medical_specialties RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medical_specialties"))

    db.session.commit()

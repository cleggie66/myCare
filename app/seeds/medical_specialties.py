from app.models import db, MedicalSpecialty, environment, SCHEMA
from sqlalchemy.sql import text


def seed_medical_specialties():
    specialty1 = MedicalSpecialty(
        name="Pediatrics",
        description="The branch of medicine dealing with the health and medical care of infants, children, and adolescents from birth up to the age of 18"
        )
    specialty2 = MedicalSpecialty(
        name="Anesthesiology",
        description="The medical specialty concerned with the total perioperative care of patients before, during and after surgery."
        )
    specialty3 = MedicalSpecialty(
        name="Family Medicine",
        description="The medical specialty within primary care that provides continuing and comprehensive health care for the individual and family across all ages, genders, diseases, and parts of the body."
        )
    specialty4 = MedicalSpecialty(
        name="Surgery",
        description="Surgery is the branch of medicine that deals with the diagnosis and treatment of injuries and disorders by operative methods."
    )
    specialty5 = MedicalSpecialty(
        name="General Surgery",
        description="General surgery is a discipline of surgery having a central core of knowledge embracing anatomy, physiology, metabolism, immunology, nutrition, pathology, wound healing, shock and resuscitation, intensive care, and neoplasia, which are common to all surgical specialties."
    )
    specialty6 = MedicalSpecialty(
        name="Primary Care",
        description="Primary care is the day-to-day healthcare given by a health care provider. Typically this provider acts as the first contact and principal point of continuing care for patients within a healthcare system"
    )
    specialty7 = MedicalSpecialty(
        name="Emergency Medicine",
        description="Emergency medicine is a medical specialty that focuses on the care of patients with acute illnesses or injuries that require immediate medical attention."
    )
    specialty8 = MedicalSpecialty(
        name="Diagnostic Medicine",
        description="Diagnostic medicine is the use of medical tests and procedures to diagnose disease or medical conditions."
    )
    specialty9 = MedicalSpecialty(
        name="Internal Medicine",
        description="Internal medicine or general internal medicine is the medical specialty dealing with the prevention, diagnosis, and treatment of internal diseases."
    )
    specialty10 = MedicalSpecialty(
        name="Dermatology",
        description="Dermatology is the branch of medicine dealing with the skin. It is a specialty with both medical and surgical aspects."
    )
    specialty11 = MedicalSpecialty(
        name="Endocrinology",
        description="Endocrinology is the study of hormones. Hormones are essential for our every-day survival. They control our temperature, sleep, mood, stress, growth and more."
    )
    specialty12 = MedicalSpecialty(
        name="Archaeology",
        description="Archaeology is the study of human history and prehistory through the excavation of sites and the analysis of artifacts and other physical remains."
    )
    specialty13 = MedicalSpecialty(
        name="Neurosurgery",
        description="Neurosurgery is the medical specialty concerned with the diagnosis and treatment of of patients with injury to, or diseases/disorders of the brain, spinal cord and spinal column, and peripheral nerves within all parts of the body."
    )
    specialty14 = MedicalSpecialty(
        name="Psychiatry",
        description="Psychiatry is the medical specialty devoted to the diagnosis, prevention, and treatment of mental conditions."
    )
    # specialty15 = MedicalSpecialty(
    #     name="",
    #     description=""
    # )


    db.session.add(specialty1)
    db.session.add(specialty2)
    db.session.add(specialty3)
    db.session.add(specialty4)
    db.session.add(specialty5)
    db.session.add(specialty6)
    db.session.add(specialty7)
    db.session.add(specialty8)
    db.session.add(specialty9)
    db.session.add(specialty10)
    db.session.add(specialty11)
    db.session.add(specialty12)
    db.session.add(specialty13)
    db.session.add(specialty14)
    db.session.commit()


def undo_medical_specialties():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.medical_specialties RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM medical_specialties"))

    db.session.commit()

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Physician(db.Model):
    __tablename__ = 'physicians'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

        id = db.Column(db.Integer, primary_key=True)
        first_name = db.Column(db.String(100), nullable=False)
        last_name = db.Column(db.String(100), nullable=False)
        picture = db.Column(db.String)
        hospital_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("hospitals.id"))) 
        medical_speciality_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("medical_specialities.id")))
        medical_education  = db.Column(db.String)
        accepts_insurance = db.Column(db.Boolean, default=True)

        # RELATIONSHIPS

        hospital = db.relationship("Hospital", back_populates="physicians")
        medical_speciality = db.relationship("MedicalSpeciality", back_populates="physicians")
        appointments = db.relationship("Appointment", back_populates="physicians")



        


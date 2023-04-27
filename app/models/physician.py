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
    medical_specialty_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("medical_specialties.id")))
    medical_education  = db.Column(db.String)
    accepts_insurance = db.Column(db.Boolean, default=True)

    # RELATIONSHIPS

    hospital = db.relationship("Hospital", back_populates="physicians")
    medical_specialty = db.relationship("MedicalSpecialty", back_populates="physicians")
    appointments = db.relationship("Appointment", back_populates="physician", cascade="all,delete")

    # METHODS

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "picture": self.picture,
            "hospital_id": self.hospital_id,
            "medical_specialty_id": self.medical_specialty_id,
            "medical_education": self.medical_education,
            "accepts_insurance": self.accepts_insurance,
            "hospital": self.hospital.to_dict_simple(),
            "medical_specialty": self.medical_specialty.to_dict_simple(),
            "appointments": [appointment.to_dict_simple() for appointment in self.appointments]
        }
    
    def to_dict_simple(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "picture": self.picture,
            "hospital_id": self.hospital_id,
            "medical_specialty_id": self.medical_specialty_id,
            "medical_education": self.medical_education,
            "accepts_insurance": self.accepts_insurance
        }


        


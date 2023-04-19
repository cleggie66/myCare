from .db import db, environment, SCHEMA, add_prefix_for_prod


class Appointment(db.Model):
    __tablename__ = 'appointments'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    physician_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("physicians.id")))
    hospital_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("hospitals.id")))
    reason_for_visit = db.Column(db.String, nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    # RELATIONSHIPS

    patient = db.relationship("User", back_populates="appointments")
    physician = db.relationship("Physician", back_populates="appointments")
    hospital = db.relationship("Hospital", back_populates="appointments")

    # METHODS

    def to_dict(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "physician_id": self.physician_id,
            "hospital_id": self.hospital_id,
            "reason_for_visit": self.reason_for_visit,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "patient": self.patient.to_dict_simple(),
            "physician": self.physician.to_dict_simple(),
            "hospital": self.hospital.to_dict_simple()
        }
    
    def to_dict_simple(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "physician_id": self.physician_id,
            "hospital_id": self.hospital_id,
            "reason_for_visit": self.reason_for_visit,
            "start_time": self.start_time,
            "end_time": self.end_time
        }

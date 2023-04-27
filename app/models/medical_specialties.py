from .db import db, environment, SCHEMA, add_prefix_for_prod


class MedicalSpecialty(db.Model):
    __tablename__ = 'medical_specialties'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)

    # RELATIONSHIPS

    physicians = db.relationship("Physician", back_populates="medical_specialty")

    # METHODS

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "physicians": [physician.to_dict_simple() for physician in self.physicians]
        }
    
    def to_dict_simple(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }


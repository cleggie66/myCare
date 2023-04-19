from .db import db, environment, SCHEMA, add_prefix_for_prod


class Hospital(db.Model):
    __tablename__ = 'hospitals'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(100))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))
    lat = db.Column(db.Numeric)
    lng = db.Column(db.Numeric)

    # RELATIONSHIPS

    physicians = db.relationship("Physician", back_populates="hospital")
    appointments = db.relationship(
        "Appointment", back_populates="hospital", cascade="all,delete")

    # METHODS

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "lat": self.lat,
            "lng": self.lng,
            "physicians": [physician.to_dict_simple() for physician in self.physicians],
            "appointments": [appointment.to_dict_simple() for appointment in self.appointments],
        }

    def to_dict_simple(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "lat": self.lat,
            "lng": self.lng
        }

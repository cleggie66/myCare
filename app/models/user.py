from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    DOB = db.Column(db.String, nullable=False)
    blood_type = db.Column(db.String)
    profile_picture = db.Column(db.String)

    # RELATIONSHIPS
    appointments = db.relationship("Appointment", back_populates="patient", cascade="all,delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'DOB': self.DOB,
            'blood_type': self.blood_type,
            'profile_picture': self.profile_picture,
            'appointments': [appointment.to_dict_simple() for appointment in self.appointments]
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'DOB': self.DOB,
            'blood_type': self.blood_type,
            'profile_picture': self.profile_picture
        }

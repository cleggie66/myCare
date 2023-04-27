from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class PhysicianForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    picture = StringField("Picture URL")
    hospital_id = IntegerField("Hospital ID")
    medical_specialty_id = IntegerField("Medical Specialty ID")
    medical_education = StringField("Medical Education")
    accepts_insurance = BooleanField("Accepts Insurance? (True or False)")
    
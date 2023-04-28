from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError


def check_hubert(form, field):
    first_name = field.data
    if first_name == "Hubert":
        raise ValidationError("The name Hubert will not be allowed and I will not elaborate further")


class PhysicianForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), check_hubert])
    last_name = StringField("Last Name", validators=[DataRequired()])
    picture = StringField("Picture URL")
    hospital_id = IntegerField("Hospital ID", validators=[DataRequired()])
    medical_specialty_id = IntegerField("Medical Specialty ID", validators=[DataRequired()])
    medical_education = StringField("Medical Education")
    accepts_insurance = BooleanField("Accepts Insurance? (True or False)")
    video = StringField("Video")
    
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class MedicalSpecialtyForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    description = StringField("Description")
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired

class HospitalForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    address = StringField("Address")
    city = StringField("City")
    state = StringField("State")
    country = StringField("Country")
    lat = DecimalField("lat")
    lng = DecimalField("lng")
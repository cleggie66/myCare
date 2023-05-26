from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, Optional

class HospitalForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    address = StringField("Address")
    city = StringField("City")
    state = StringField("State")
    country = StringField("Country")
    lat = DecimalField("lat", validators=[Optional()])
    lng = DecimalField("lng", validators=[Optional()])
    map_picture = StringField("Map Picture")
    website_url = StringField("Website URL")
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AppointmentForm(FlaskForm):
    patient_id = IntegerField("Patient ID", validators=[DataRequired()])
    physician_id = IntegerField("Physician ID", validators=[DataRequired()])
    hospital_id = IntegerField("Hospital ID", validators=[DataRequired()])
    reason_for_visit = StringField("Reason for visit", validators=[DataRequired()])
    start_time = StringField("Start Time", validators=[DataRequired()])
    end_time = StringField("End Time", validators=[DataRequired()])
    
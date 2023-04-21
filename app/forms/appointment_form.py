from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class AppointmentForm(FlaskForm):
    patient_id = IntegerField("Patient ID", validators=[DataRequired()])
    physician_id = IntegerField("Physician ID", validators=[DataRequired()])
    hospital_id = IntegerField("Hospital ID", validators=[DataRequired()])
    reason_for_visit = StringField("Reason for visit", validators=[DataRequired()])
    start_time = DateTimeField("Start Time", validators=[DataRequired()])
    end_time = DateTimeField("End Time", validators=[DataRequired()])
    
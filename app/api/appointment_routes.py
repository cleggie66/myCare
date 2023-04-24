from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Appointment, User, db
from app.forms import AppointmentForm
from datetime import datetime


appointment_routes = Blueprint('appointments', __name__)

# -----------  POST  --------------
# Creates a new appointment

@appointment_routes.route("", methods=["POST"])
@login_required
def create_appointment():
    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_appointment = Appointment(
            patient_id=current_user.id,
            physician_id=form.data["physician_id"],
            hospital_id=form.data["hospital_id"],
            reason_for_visit=form.data["reason_for_visit"],
            start_time=datetime.strptime(form.data["start_time"], "%Y-%m-%d %H:%M:%S"),
            end_time=datetime.strptime(form.data["end_time"], "%Y-%m-%d %H:%M:%S")
        )
        db.session.add(new_appointment)
        db.session.commit()
        return new_appointment.to_dict()
    return {"Message": "Invalid Data"}


# TODO: Might want to nix this route for security reasons, keeping it for now
# -----------  GET  --------------
# Returns all appointments

@appointment_routes.route("/all")
@login_required
def get_all_appointments():
    appointments = Appointment.query.all()

    if not appointments:
        return {
            "message": "Appointments not found",
            "status_code": 404
        }, 404
    
    return {"appointments": [appointment.to_dict() for appointment in appointments]}


# -----------  GET  --------------
# Returns all appointments for the current user

@appointment_routes.route("")
@login_required
def get_all_user_appointments():
    user = User.query.filter(User.id == current_user.id).first()
    return {"appointments": [appointment.to_dict() for appointment in user.appointments]}


# -----------  PUT  --------------
# Updates an appointment

@appointment_routes.route("/<int:appointment_id>", methods=["PUT"])
@login_required
def update_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)

    if not appointment:
        return {
            "message": "Appointment could not be found",
            "status_code": 404
        }, 404

    form = AppointmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        appointment.patient_id=current_user.id
        appointment.physician_id=form.data["physician_id"]
        appointment.hospital_id=form.data["hospital_id"]
        appointment.reason_for_visit=form.data["reason_for_visit"]
        appointment.start_time=datetime.strptime(form.data["start_time"], "%Y-%m-%d %H:%M:%S")
        appointment.end_time=datetime.strptime(form.data["end_time"], "%Y-%m-%d %H:%M:%S")

        db.session.commit()
        return appointment.to_dict()
    return {"Message": "Invalid Data"}

# -----------  DELETE  --------------
# Deletes an appointment

@appointment_routes.route("/<int:appointment_id>", methods=["DELETE"])
@login_required
def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)

    if not appointment:
        return {
            "message": "Appointment could not be found",
            "status_code": 404
        }, 404
    
    db.session.delete(appointment)
    db.session.commit()
    return {"Message": "Appointment successfully deleted"}
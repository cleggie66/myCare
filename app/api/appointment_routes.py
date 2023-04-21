from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Appointment, User, db


appointment_routes = Blueprint('appointments', __name__)

# -----------  POST  --------------
# Creates a new appointment

@appointment_routes.route("", methods={"POST"})
@login_required
def create_appointment(physician_id):
    appointment = Appointment()


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



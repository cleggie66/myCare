from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import MedicalSpeciality, db
from app.forms import MedicalSpecialityForm

medical_speciality_routes = Blueprint('medical_specialities', __name__)


# -----------  POST  --------------
# Creates a new medical speciality

@medical_speciality_routes.route("", methods=["POST"])
@login_required
def create_medical_speciality():
    form = MedicalSpecialityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_medical_speciality = MedicalSpeciality(
            name=form.data["name"],
            description=form.data["description"],
        )
        db.session.add(new_medical_speciality)
        db.session.commit()
        return new_medical_speciality.to_dict()
    return{"Message": "Invalid Data"}


# -----------  GET  --------------
# Returns all medical specialities

@medical_speciality_routes.route("")
@login_required
def get_all_medical_specialities():
    medical_specialities = MedicalSpeciality.query.all()

    if not medical_specialities:
        return {
            "message": "Medical Specialities could not be found",
            "status_code": 404
        }, 404

    return {"Medical Specialities": [medical_speciality.to_dict() for medical_speciality in medical_specialities]}


# -----------  GET  --------------
# Returns medical speciality from id

@medical_speciality_routes.route("/<int:medical_speciality_id>")
@login_required
def get_medical_speciality(medical_speciality_id):
    medical_speciality = MedicalSpeciality.query.get(medical_speciality_id)

    if not medical_speciality:
        return {
            "message": "Medical Speciality could not be found",
            "status_code": 404
        }, 404

    return medical_speciality.to_dict()


# -----------  PUT  --------------
# Updates a medical speciality

@medical_speciality_routes.route("/<int:medical_speciality_id>", methods=["PUT"])
@login_required
def update_medical_speciality(medical_speciality_id):
    medical_speciality = MedicalSpeciality.query.get(medical_speciality_id)

    if not medical_speciality:
        return {
            "message": "Medical Speciality could not be found",
            "status_code": 404
        }, 404
    
    form = MedicalSpecialityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        medical_speciality.name=form.data["name"]
        medical_speciality.description=form.data["description"]

        db.session.commit()
        return medical_speciality.to_dict()
    return {"Message": "Invalid Data"}


# -----------  DELETE  --------------
# Deletes a medical speciality

@medical_speciality_routes.route("/<int:medical_speciality_id>", methods=["DELETE"])
@login_required
def delete_medical_speciality(medical_speciality_id):
    medical_speciality = MedicalSpeciality.query.get(medical_speciality_id)

    if not medical_speciality:
        return {
            "message": "Medical Speciality could not be found",
            "status_code": 404
        }, 404
    
    db.session.delete(medical_speciality)
    db.session.commit()
    return {"Message": "Medical Speciality successfully deleted"}
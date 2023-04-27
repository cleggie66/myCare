from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import MedicalSpecialty, db
from app.forms import MedicalSpecialtyForm

specialty_routes = Blueprint('specialties', __name__)


# -----------  POST  --------------
# Creates a new medical specialty

@specialty_routes.route("", methods=["POST"])
@login_required
def create_specialty():
    form = MedicalSpecialtyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_specialty = MedicalSpecialty(
            name=form.data["name"],
            description=form.data["description"],
        )
        db.session.add(new_specialty)
        db.session.commit()
        return new_specialty.to_dict()
    return{"Message": "Invalid Data"}


# -----------  GET  --------------
# Returns all medical specialties

@specialty_routes.route("")
@login_required
def get_all_medical_specialties():
    medical_specialties = MedicalSpecialty.query.all()

    if not medical_specialties:
        return {
            "message": "Medical specialties could not be found",
            "status_code": 404
        }, 404

    return {"Medical specialties": [specialty.to_dict() for specialty in medical_specialties]}


# -----------  GET  --------------
# Returns medical specialty from id

@specialty_routes.route("/<int:specialty_id>")
@login_required
def get_specialty(specialty_id):
    specialty = MedicalSpecialty.query.get(specialty_id)

    if not specialty:
        return {
            "message": "Medical specialty could not be found",
            "status_code": 404
        }, 404

    return specialty.to_dict()


# -----------  PUT  --------------
# Updates a medical specialty

@specialty_routes.route("/<int:specialty_id>", methods=["PUT"])
@login_required
def update_specialty(specialty_id):
    specialty = MedicalSpecialty.query.get(specialty_id)

    if not specialty:
        return {
            "message": "Medical specialty could not be found",
            "status_code": 404
        }, 404
    
    form = MedicalSpecialtyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        specialty.name=form.data["name"]
        specialty.description=form.data["description"]

        db.session.commit()
        return specialty.to_dict()
    return {"Message": "Invalid Data"}


# -----------  DELETE  --------------
# Deletes a medical specialty

@specialty_routes.route("/<int:specialty_id>", methods=["DELETE"])
@login_required
def delete_specialty(specialty_id):
    specialty = MedicalSpecialty.query.get(specialty_id)

    if not specialty:
        return {
            "message": "Medical specialty could not be found",
            "status_code": 404
        }, 404
    
    db.session.delete(specialty)
    db.session.commit()
    return {"Message": "Medical specialty successfully deleted"}
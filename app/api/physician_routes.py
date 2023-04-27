from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Physician, db
from app.forms import PhysicianForm

physician_routes = Blueprint('physicians', __name__)


# -----------  POST  --------------
# Creates a new physician

@physician_routes.route("", methods=["POST"])
@login_required
def create_physician():
    form = PhysicianForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_physician = Physician(
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            picture=form.data["picture"],
            hospital_id=form.data["hospital_id"],
            medical_specialty_id=form.data["medical_specialty_id"],
            medical_education=form.data["medical_education"],
            accepts_insurance=form.data["accepts_insurance"],
            video=form.data["video"]
        )
        db.session.add(new_physician)
        db.session.commit()
        return new_physician.to_dict()
    return {"Message": "Invalid Data"}


# -----------  GET  --------------
# Returns all physicians

@physician_routes.route("")
@login_required
def get_all_physicians():
    physicians = Physician.query.all()

    if not physicians:
        return {
            "message": "Physicians could not be found",
            "status_code": 404
        }, 404

    return {"physicians": [physician.to_dict() for physician in physicians]}


# -----------  GET  --------------
# Returns physician from id

@physician_routes.route("/<int:physician_id>")
@login_required
def get_physician(physician_id):
    physician = Physician.query.get(physician_id)

    if not physician:
        return {
            "message": "Physician could not be found",
            "status_code": 404
        }, 404

    return physician.to_dict()


# -----------  PUT  --------------
# Updates a physician

@physician_routes.route("/<int:physician_id>", methods=["PUT"])
@login_required
def update_physician(physician_id):
    physician = Physician.query.get(physician_id)

    if not physician:
        return {
            "message": "Physician could not be found",
            "status_code": 404
        }, 404
    
    form = PhysicianForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        physician.first_name=form.data["first_name"]
        physician.last_name=form.data["last_name"]
        physician.picture=form.data["picture"]
        physician.hospital_id=form.data["hospital_id"]
        physician.medical_specialty_id=form.data["medical_specialty_id"]
        physician.medical_education=form.data["medical_education"]
        physician.accepts_insurance=form.data["accepts_insurance"]
        physician.video=form.data["video"]

        db.session.commit()
        return physician.to_dict()
    return {"message": "Invalid Data"}


# -----------  DELETE  --------------
# Deletes a physician

@physician_routes.route("/<int:physician_id>", methods=["DELETE"])
@login_required
def delete_physician(physician_id):
    physician = Physician.query.get(physician_id)

    if not physician:
        return {
            "message": "Physician could not be found",
            "status_code": 404
        }, 404
    
    db.session.delete(physician)
    db.session.commit()
    return {"message": "Physician successfully deleted"}

    

from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Hospital, db
from app.forms import HospitalForm

hospital_routes = Blueprint('hospitals', __name__)


# -----------  POST  --------------
# Creates a new hospital

@hospital_routes.route("", methods=["POST"])
@login_required
def create_hospital():
    form = HospitalForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_hospital = Hospital(
            name=form.data["name"],
            address=form.data["address"],
            city=form.data["city"],
            state=form.data["state"],
            country=form.data["country"],
            lat=form.data["lat"],
            lng=form.data["lng"]
        )
        db.session.add(new_hospital)
        db.session.commit()
        return new_hospital.to_dict()
    return{"Message": "Invalid Data"}


# -----------  GET  --------------
# Returns all hospitals

@hospital_routes.route("")
@login_required
def get_all_hospitals():
    hospitals = Hospital.query.all()

    if not hospitals:
        return {
            "message": "Hospitals could not be found",
            "status_code": 404
        }, 404

    return {"hospitals": [hospital.to_dict() for hospital in hospitals]}


# -----------  GET  --------------
# Returns hospital from id

@hospital_routes.route("/<int:hospital_id>")
@login_required
def get_hospital(hospital_id):
    hospital = Hospital.query.get(hospital_id)

    if not hospital:
        return {
            "message": "Hospital could not be found",
            "status_code": 404
        }, 404

    return hospital.to_dict()


# -----------  PUT  --------------
# Updates a hospital

@hospital_routes.route("/<int:hospital_id>", methods=["PUT"])
@login_required
def update_hospital(hospital_id):
    hospital = Hospital.query.get(hospital_id)

    if not hospital:
        return {
            "message": "Hospital could not be found",
            "status_code": 404
        }, 404
    
    form = HospitalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        hospital.name=form.data["name"]
        hospital.address=form.data["address"]
        hospital.city=form.data["city"]
        hospital.state=form.data["state"]
        hospital.country=form.data["country"]
        hospital.lat=form.data["lat"]
        hospital.lng=form.data["lng"]

        db.session.commit()
        return hospital.to_dict()
    return {"Message": "Invalid Data"}


# -----------  DELETE  --------------
# Deletes a hospital

@hospital_routes.route("/<int:hospital_id>", methods=["DELETE"])
@login_required
def delete_hospital(hospital_id):
    hospital = Hospital.query.get(hospital_id)

    if not hospital:
        return {
            "message": "Hospital could not be found",
            "status_code": 404
        }, 404
    
    db.session.delete(hospital)
    db.session.commit()
    return {"Message": "Hospital successfully deleted"}
from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Physician, db
from app.forms import PhysicianForm


physician_routes = Blueprint('physicians', __name__)


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

    return {"Physicians": [physician.to_dict() for physician in physicians]}


# -----------  GET  --------------
# Returns physician from id

@physician_routes.route("/<physician_id>")
@login_required
def get_physician(physician_id):
    physician = Physician.query.get(physician_id)

    if not physician:
        return {
            "message": "Physician could not be found",
            "status_code": 404
        }, 404

    return physician.to_dict()


# -----------  POST  --------------
# Creates a new physician

@physician_routes.route("", methods=["POST"])
@login_required
def create_physician(physician_data):
    form = PhysicianForm()
    form['csrf_token'].data = request.cookies['csrf_token']



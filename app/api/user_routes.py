from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


# -----------  GET  --------------
# Returns all users

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# -----------  GET  --------------
# Returns single user from id

@user_routes.route('/<int:user_id>')
@login_required
def user(user_id):
    user = User.query.get(user_id)
    return user.to_dict()
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_check(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email or password was incorrect')
    if not user.check_password(password):
        raise ValidationError('Email or password was incorrect')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), user_check])
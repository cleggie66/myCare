from flask.cli import AppGroup
from .appointments import seed_appointments, undo_appointments 
from .hospitals import seed_hospitals, undo_hospitals
from .medical_specialties import seed_medical_specialties, undo_medical_specialties
from .physicians import seed_physicians, undo_physicians
from .users import seed_users, undo_users


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_appointments()
        undo_physicians()
        undo_medical_specialties()
        undo_hospitals()
        undo_users()
    seed_users()
    seed_hospitals()
    seed_medical_specialties()
    seed_physicians()
    seed_appointments()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_appointments()
    undo_physicians()
    undo_medical_specialties()
    undo_hospitals()
    undo_users()
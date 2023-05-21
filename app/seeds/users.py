from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User", DOB=(datetime(2022, 11, 12)), blood_type="AB+", profile_picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    tony = User(
        username='tony', email='tony@aa.io', password='password', first_name="Tony", last_name="Soprano", DOB=(datetime(1959, 8, 22)), blood_type="AB+", profile_picture="https://static.wikia.nocookie.net/sopranos/images/c/c2/Tony_Soprano.jpg/revision/latest/scale-to-width-down/700?cb=20211117185559")
    bobby = User(
        username='bobby', email='bobby@aa.io', password='password', first_name="Bobby", last_name="Baccalieri", DOB=(datetime(1959, 6, 12)), blood_type="AB+", profile_picture="https://static.wikia.nocookie.net/sopranos/images/5/5f/Bacala.jpg/revision/latest?cb=20091216120453")
    db.session.add(demo)
    db.session.add(tony)
    db.session.add(bobby)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
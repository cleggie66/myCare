from app.models import db, Physician, environment, SCHEMA
from sqlalchemy.sql import text


def seed_physicians():
    doc1 = Physician(
        first_name="Christina",
        last_name="Yang",
        picture="https://upload.wikimedia.org/wikipedia/commons/d/d8/Cristina_Yang.jpg",
        hospital_id=6,
        medical_specialty_id=1,
        medical_education="PhD",
        accepts_insurance=True,
        video="https://youtu.be/dQw4w9WgXcQ"
    )
    doc2 = Physician(
        first_name="Mikhail",
        last_name="Varshavski",
        picture="https://yt3.googleusercontent.com/ytc/AGIKgqPmK1ByzeeLa49q6DJoTKm0_2kTHVXaIpaV25FSYw=s900-c-k-c0x00ffffff-no-rj",
        hospital_id=7,
        medical_specialty_id=6,
        medical_education="D.O.",
        accepts_insurance=True,
        video="https://youtu.be/m2SVFx2mOEg"
    )
    doc3 = Physician(
        first_name="Christopher",
        last_name="Turk",
        picture="https://upload.wikimedia.org/wikipedia/en/3/30/Turk-season9.jpg",
        hospital_id=5,
        medical_specialty_id=4,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=81NpdkTcMAE&ab_channel=SchnufSchnuf"
    )
    doc4 = Physician(
        first_name="Meredith",
        last_name="Grey",
         picture="https://upload.wikimedia.org/wikipedia/en/5/53/Greys-Anatomy-Season-7-Promo-9.jpg",
        hospital_id=6,
        medical_specialty_id=5,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=vDfiZJxW5Jo&ab_channel=ABC"
    )
    doc5 = Physician(
        first_name="John",
        last_name="Dorian",
        picture="https://upload.wikimedia.org/wikipedia/en/a/a2/Jd_season9.jpg",
        hospital_id=5,
        medical_specialty_id=9,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=6ySt9SeZl9s&ab_channel=JeffBeck"
    )
    doc6 = Physician(
        first_name="Lisa",
        last_name="Cuddy",
        picture="https://sites.google.com/a/guhsd.net/tv_tokenismsocp3_house-m-d-13/_/rsrc/1363711409722/cast/lisa-edelstein/imgres-6.jpeg?height=400&width=299",
        hospital_id=4,
        medical_specialty_id=11,
        medical_education="M.D.",
        accepts_insurance=True,
        video=""
    )
    doc7 = Physician(
        first_name="Miranda",
        last_name="Bailey",
        picture="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Dr._Miranda_Bailey.jpg/220px-Dr._Miranda_Bailey.jpg",
        hospital_id=6,
        medical_specialty_id=5,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://youtu.be/ERlZ5ia7MiI"
    )
    doc8 = Physician(
        first_name="Sandra",
        last_name="Lee",
        picture="https://www.skinps.com/wp-content/uploads/2022/09/Sandra-Lee.jpg",
        hospital_id=9,
        medical_specialty_id=10,
        medical_education="M.D.",
        accepts_insurance=True,
        video=""
    )
    doc9 = Physician(
        first_name="Doug",
        last_name="Ross",
        picture="https://upload.wikimedia.org/wikipedia/en/2/27/DougRoss.jpg",
        hospital_id=8,
        medical_specialty_id=7,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=XNzcXXR3iHA&ab_channel=ER-EmergencyRoom"
    )
    doc10 = Physician(
        first_name="Stephen",
        last_name="Strange",
        picture="https://i.pinimg.com/originals/fa/f9/d0/faf9d05c08e9ef78b7b2c43b328a864b.jpg",
        hospital_id=11,
        medical_specialty_id=13,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=GOOkWuzPIv8&pp=ygUSZHIgc3RyYW5nZSBzdXJnZXJ5&ab_channel=Hungry"
    )
    doc11 = Physician(
        first_name="Gregory",
        last_name="House",
        picture="https://pbs.twimg.com/profile_images/1285050436018462720/lgrrmdlH_400x400.jpg",
        hospital_id=4,
        medical_specialty_id=8,
        medical_education="M.D.",
        accepts_insurance=False,
        video="https://www.youtube.com/watch?v=wUDa39i3kbY&ab_channel=HouseM.D."
        )
    doc12 = Physician(
        first_name="John",
        last_name="Carter",
        picture="https://upload.wikimedia.org/wikipedia/en/9/99/Dr_carter.jpg",
        hospital_id=8,
        medical_specialty_id=7,
        medical_education="M.D.",
        accepts_insurance=True,
        video="https://youtu.be/aEz-EkPwfE0"
    )
    doc13 = Physician(
        first_name="Indy",
        last_name="Jones",
        picture="https://i.pinimg.com/564x/65/cf/ed/65cfed31646ccdf10e74cbeb0d8abad7.jpg",
        hospital_id=10,
        medical_specialty_id=12,
        medical_education="PhD",
        accepts_insurance=True,
        video="https://www.youtube.com/watch?v=joqX0_llyWE&pp=ygUWaW5kaWFuYSBqb25lcyB0ZWFjaGluZw%3D%3D&ab_channel=ClipsTime"
    )
    doc14 = Physician(
        first_name="Derek",
        last_name="Shepherd",
        picture="https://upload.wikimedia.org/wikipedia/en/b/b4/Dr._Derek_Shepherd.jpg",
        hospital_id=6,
        medical_specialty_id=13,
        medical_education="M.D",
        accepts_insurance=True,
        video=""
    )
    doc15 = Physician(
        first_name="Neven",
        last_name="Bell",
        picture="https://lthumb.lisimg.com/152/13305152.jpg?width=411&sharpen=true",
        hospital_id=2,
        medical_specialty_id=14,
        medical_education="M.D.",
        accepts_insurance=True,
        video=""
    )
    # doc16 = Physician(
    #     first_name="",
    #     last_name="",
    #     picture="",
    #     hospital_id=1,
    #     medical_specialty_id=1,
    #     medical_education="",
    #     accepts_insurance=True,
    #     video=""
    # )
    
    
    db.session.add_all([doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10, doc11, doc12, doc13, doc14, doc15])
    db.session.commit()


def undo_physicians():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.physicians RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM physicians"))

    db.session.commit()

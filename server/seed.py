from random import randint
from app import app, db
from model.hero import Hero
from model.heroPower import HeroPower
from model.power import Power
from sqlalchemy.exc import IntegrityError

def seed_powers():
    with app.app_context():
        print("🦸‍♀️ Seeding powers...")
        powers_data = [
            {"name": "super strength", "description": "gives the wielder super-human strengths"},
            {"name": "flight", "description": "gives the wielder the ability to fly through the skies at supersonic speed"},
            {"name": "super human senses", "description": "allows the wielder to use her senses at a super-human level"},
            {"name": "elasticity", "description": "can stretch the human body to extreme lengths"}
        ]

        for data in powers_data:
            existing_power = Power.query.filter_by(name=data["name"]).first()
            if existing_power is None:
                power = Power(**data)
                db.session.add(power)
                db.session.commit()

def seed_heroes():
    with app.app_context():
        print("🦸‍♀️ Seeding heroes...")
        heroes_data = [
            {"name": "Kamala Khan", "super_name": "Ms. Marvel"},
            {"name": "Doreen Green", "super_name": "Squirrel Girl"},
            {"name": "Stacy Queen", "super_name": "Spider-Gwen"},
            {"name": "Tony Stark", "super_name": "Iron Man"},
            {"name": "Bruce Wayne", "super_name": "Batman"},
            {"name": "Diana Prince", "super_name": "Wonder Woman"},
            {"name": "Peter Parker", "super_name": "Spider-Man"},
            {"name": "Clark Kent", "super_name": "Superman"},
            {"name": "Barry Allen", "super_name": "The Flash"},
            {"name": "Natasha Romanoff", "super_name": "Black Widow"},
            {"name": "Arthur Curry", "super_name": "Aquaman"},
            {"name": "Wade Wilson", "super_name": "Deadpool"},
            {"name": "Jean Grey", "super_name": "Phoenix"},
        ]

        for data in heroes_data:
            existing_hero = Hero.query.filter_by(name=data["name"]).first()
            if existing_hero is None:
                hero = Hero(**data)
                db.session.add(hero)
                db.session.commit()

def seed_data():
    with app.app_context():
        seed_powers()
        seed_heroes()

        print("🦸‍♀️ Adding powers to heroes...")
        strengths = ["Strong", "Weak", "Average"]

        for hero in Hero.query.all():
            for _ in range(1, 4):
                power = Power.query.order_by(db.func.random()).first()
                hero_power = HeroPower(hero=hero, power=power, strength=strengths[randint(0, 2)])
                try:
                    db.session.add(hero_power)
                    db.session.commit()
                except IntegrityError:
                    db.session.rollback()

        print("🦸‍♀️ Done seeding!")

if __name__ == "__main__":
    seed_data()
    print("Database seeded successfully.")

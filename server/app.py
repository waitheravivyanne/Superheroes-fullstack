#!/usr/bin/env python3

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from config import db
from model.hero import Hero
from model.heroPower import HeroPower
from model.power import Power

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={
    r"/heroes": {"origins": ["http://localhost:3000"]},
    r"/powers": {"origins": ["http://localhost:3000"]},
    r"/*": {"origins": "*"}
})
migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return 'Welcome to the superheroes world!!!'

@app.route('/heroes', methods=['GET'])
def get_heroes():
    heroes = Hero.query.all()
    heroes_list = [{"id": hero.id, "name": hero.name, "super_name": hero.super_name} for hero in heroes]
    return jsonify(heroes_list)

@app.route('/heroes/<int:id>', methods=['GET'])
def get_hero(id):
    hero = db.session.get(Hero, id)
    if hero:
        hero_data = {
            "id": hero.id,
            "name": hero.name,
            "super_name": hero.super_name,
            "powers": [{"id": power.id, "name": power.name, "description": power.description} for power in hero.powers]
        }
        return jsonify(hero_data)
    else:
        return jsonify({"error": "Hero not found"}), 404
@app.route('/heroes', methods=['POST'])
def create_hero():
    data = request.get_json()
    name = data.get('name')
    super_name = data.get('super_name')

    if not name or not super_name:
        return jsonify({"error": "Invalid request, 'name' and 'super_name' are required"}), 400

    new_hero = Hero(name=name, super_name=super_name)

    try:
        db.session.add(new_hero)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create hero", "details": str(e)}), 500

    hero_data = {
        "id": new_hero.id,
        "name": new_hero.name,
        "super_name": new_hero.super_name,
    }

    return jsonify(hero_data), 201

@app.route('/powers', methods=['GET'])
def get_powers():
    powers = Power.query.all()
    powers_list = [{"id": power.id, "name": power.name, "description": power.description} for power in powers]
    return jsonify(powers_list)

@app.route('/powers/<int:id>', methods=['GET'])
def get_power(id):
    power = db.session.get(Power, id)
    if power:
        power_data = {"id": power.id, "name": power.name, "description": power.description}
        return jsonify(power_data)
    else:
        return jsonify({"error": "Power not found"}), 404

@app.route('/powers', methods=['POST'])
def create_power():
    data = request.get_json()

    if 'name' not in data or 'description' not in data:
        return jsonify({"error": "Both 'name' and 'description' are required fields"}), 400

    name = data['name']
    description = data['description']

    if not name.strip() or not description.strip():
        return jsonify({"error": "'name' and 'description' cannot be empty"}), 400

    existing_power = Power.query.filter_by(name=name).first()
    if existing_power:
        return jsonify({"error": "A power with the same name already exists"}), 400

    new_power = Power(name=name, description=description)

    try:
        db.session.add(new_power)
        db.session.commit()
        power_data = {
            "id": new_power.id,
            "name": new_power.name,
            "description": new_power.description,
        }
        return jsonify(power_data), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create power", "details": str(e)}), 500


@app.route('/powers/<int:id>', methods=['PATCH'])
def update_power(id):
    power = db.session.get(Power, id)
    if power:
        data = request.get_json()
        if 'description' in data:
            power.description = data['description']
            db.session.commit()
            return jsonify({"id": power.id, "name": power.name, "description": power.description})
        else:
            return jsonify({"error": "Invalid request"}), 400
    else:
        return jsonify({"error": "Power not found"}), 404

@app.route('/hero_powers', methods=['POST'])
def create_hero_power():
    data = request.get_json()
    strength = data.get('strength')
    power_id = data.get('power_id')
    hero_id = data.get('hero_id')

    if not strength or not power_id or not hero_id:
        return jsonify({"error": "Invalid request"}), 400

    if strength not in ['Strong', 'Weak', 'Average']:
        return jsonify({"errors": ["Validation error: 'strength' must be one of 'Strong', 'Weak', 'Average"]}), 400

    hero = db.session.get(Hero, hero_id)
    power = db.session.get(Power, power_id)

    if not hero or not power:
        return jsonify({"error": "Hero or Power not found"}), 404

    hero_power = HeroPower(strength=strength, hero=hero, power=power)

    db.session.add(hero_power)
    db.session.commit()

    hero_data = {
        "id": hero.id,
        "name": hero.name,
        "super_name": hero.super_name,
        "powers": [{"id": p.id, "name": p.name, "description": p.description} for p in hero.powers]
    }

    return jsonify(hero_data), 201

@app.route('/heroes/<int:id>', methods=['DELETE'])
def delete_hero(id):
    hero = db.session.get(Hero, id)
    if hero:
        db.session.delete(hero)
        db.session.commit()
        return jsonify({"message": "Hero deleted successfully"}), 204
    else:
        return jsonify({"error": "Hero not found"}), 404

@app.route('/powers/<int:id>', methods=['DELETE'])
def delete_power(id):
    power = db.session.get(Power, id)
    if power:
        db.session.delete(power)
        db.session.commit()
        return jsonify({"message": "Power deleted successfully"}), 200
    else:
        return jsonify({"error": "Power not found"}), 404

if __name__ == '__main__':
    app.run(port=5555)

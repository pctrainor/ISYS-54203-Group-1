import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'  # Database in the same directory
app.config['SECRET_KEY'] = 'your_very_secret_key'  # Important: Change this!
db = SQLAlchemy(app)

CORS(app)  # Enable CORS for all origins (for development/testing)

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentID = db.Column(db.String(80), nullable=False)
    firstName = db.Column(db.String(80), nullable=False)
    lastName = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    major = db.Column(db.String(120))
    year = db.Column(db.Integer)
    notificationPrefs = db.Column(db.String(200))  

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/profile', methods=['POST'])
def create_profile():
    data = request.get_json()
    new_profile = Profile(
        studentID=data['studentID'],
        firstName=data['firstName'],
        lastName=data['lastName'],
        email=data['email'],
        major=data['major'],
        year=data['year'],
        notificationPrefs=','.join(data['notificationPrefs']) 
    )
    new_profile.set_password(data['password'])
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({'message': 'Profile created successfully'}), 201 

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
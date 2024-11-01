import re
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
app.config['SECRET_KEY'] = os.urandom(24)  # Generate a strong secret key
db = SQLAlchemy(app)

CORS(app)

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

    existing_profile = Profile.query.filter_by(email=data['email']).first()
    if existing_profile:
        return jsonify({'message': 'Email address already exists'}), 400

    new_profile = Profile(
        studentID=data['studentID'],
        firstName=data['firstName'],
        lastName=data['lastName'],
        email=data['email'],
        major=data['major'],
        year=data['year'],
        notificationPrefs=','.join(data['notificationPrefs'])
    )

    password = data['password']

    if not is_valid_password(password):
        return jsonify({'message': 'Password does not meet requirements'}), 400

    new_profile.set_password(data['password'])
    db.session.add(new_profile)
    db.session.commit()

    # Set session variables AFTER committing to the database
    session['user_id'] = new_profile.id  
    session['logged_in'] = True

    return jsonify({'message': 'Profile created successfully, you are now logged in'}), 201


def is_valid_password(password):
    """Checks if the password meets the requirements. Password must be 8 characters or longer, with at least one a letter and at least one a number 1-9"""
    if len(password) < 8:
        return False
    if not re.search("[a-z]", password):
        return False
    if not re.search("[0-9]", password):
        return False
    return True

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('logged_in', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/Home.html')
def homepage():
    if 'logged_in' in session and session['logged_in']:
        user_id = session['user_id']
        user = Profile.query.get(user_id)

        if user:
            return render_template('Home.html', user=user)
        else:
            print(f"Error: User with ID {user_id} not found in the database.")
            return "User not found", 500
    else:
        return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
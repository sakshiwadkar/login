from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User
import random
import requests

app = Flask(__name__)

app.config['SECRET_KEY'] = 'cairocoders-ednalan'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/tokendb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to a long, random string in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Token doesn't expire for demonstration purposes

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
db.init_app(app)
jwt = JWTManager(app)



with app.app_context():
    db.create_all()

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/send-otp", methods=["POST"])
def send_otp():
    email = request.json["email"]
    otp = random.randint(1000, 9999)
    session['otp'] = str(otp) 
    session['email'] = email
    
    app.logger.info("Session Data After Setting OTP: %s", session)
    
    # Construct email body with OTP
    email_body = f"<html><body><h2>Your OTP is:</h2><p>{otp}</p></body></html>"
    
    # Send email using Elastic Email API
    response = requests.post(
        "https://api.elasticemail.com/v2/email/send",
        data={
            "apikey": "696B1C556C0611EF31D8A02E22987AAD361EE51547B47CFC8A56DDBBB4F00CA215F783AEB4C1C9AE5B9256ECF422F2F4",  # Replace with your Elastic Email API key
            "subject": "Email OTP",
            "from": "its94364@gmail.com",  # Replace with your sender email
            "to": email,
            "bodyHtml": email_body
        }
    )
    
    if response.status_code == 200:
        return jsonify({"message": "OTP sent successfully", "otp": otp})
    else:
        return jsonify({"error": "Failed to send OTP"}), 500

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    try:
        data = request.json
        email = data.get("email")
        entered_otp = data.get("otp")

        if not email or not entered_otp:
            return jsonify({"error": "Email and OTP are required."}), 400

        stored_otp = session.get('otp')
        stored_email = session.get('email')
        
        app.logger.info("Stored Email and OTP: %s, %s", stored_email, stored_otp)

        if stored_otp is None or stored_email is None:
            return jsonify({"error": "Email or OTP not found in session"}), 400

        if str(entered_otp) == str(stored_otp) and email == stored_email:
            return jsonify({"message": "OTP verified successfully"})
        else:
            return jsonify({"error": "Invalid OTP or email"}), 401
    except Exception as e:
        app.logger.error("An error occurred while processing /verify-otp request: %s", str(e))
        return jsonify({"error": "An error occurred"}), 500

@app.route("/register", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]  # New
    mobilenumber = request.json["mobilenumber"]
    address = request.json["address"] 
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, role=role,mobilenumber=mobilenumber,address=address)  # Updated
    db.session.add(new_user)

    try:
        db.session.commit()
        session["user_id"] = new_user.id
        return jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "role": new_user.role,  # Return role in response
            "mobilenumber": new_user.mobilenumber,
            "address": new_user.address 
        })
    except Exception as e:
        app.logger.error("An error occurred while processing /register request: %s", str(e))  # Log error message
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    access_token = create_access_token(identity=user.id)  # Create JWT token
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    })
@app.route("/reset_password", methods=["POST"])
def reset_password():
    email = request.json["email"]
    new_password = request.json["new_password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password

    try:
        db.session.commit()
        return jsonify({"message": "Password reset successfully"})
    except Exception as e:
        app.logger.error("An error occurred while processing /reset_password request: %s", str(e))  # Log error message
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
@app.route("/protected", methods=["GET"])
@jwt_required()  # Endpoint requires a valid JWT token
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.email), 200
if __name__ == "__main__":
    app.run(debug=True)

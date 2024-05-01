from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # Use an auto-incrementing integer field for ID
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    mobilenumber = db.Column(db.BigInteger) 
    address = db.Column(db.String(250))

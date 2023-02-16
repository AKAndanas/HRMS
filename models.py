from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4



db= SQLAlchemy()



def get_uuid():
    return uuid4().hex




class Account(db.Model):
    __tablename__="accounts"
    id= db.Column(db.String(32), primary_key=True, unique = True, default=get_uuid)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
   
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(120),unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    position = db.Column(db.String(80), nullable=False)
    experience = db.Column(db.Integer, nullable=False)
    noticeperiod = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    remarks = db.Column(db.String(200), nullable=False)
    curcompany = db.Column(db.String(80), nullable=False)
    curctc = db.Column(db.Integer, nullable=False)
    expctc = db.Column(db.Integer, nullable=False)
    doi= db.Column(db.String(80), nullable=False)
    status= db.Column(db.String(80), nullable=False)
    feedback = db.Column(db.String(500), nullable=False)
    createdby = db.Column(db.String(80), nullable=False)
    createddate = db.Column(db.String(80), nullable=False)
    updateddate = db.Column(db.String(80), nullable=False)
    vendor= db.Column(db.String(80), nullable=False)
    def __init__(self, name, email,experience,phone,position,noticeperiod,location,remarks,curcompany,curctc,expctc,doi,status,feedback,createdby,createddate,updateddate,vendor):
        self.name = name
        self.email = email
        self.experience= experience
        self.phone=phone
        self.position=position
        self.noticeperiod=noticeperiod
        self.location=location
        self.remarks=remarks
        self.curcompany=curcompany
        self.curctc=curctc
        self.expctc=expctc
        self.doi=doi
        self.status=status
        self.feedback=feedback
        self.createdby=createdby
        self.createddate=createddate
        self.updateddate=updateddate
        self.vendor=vendor


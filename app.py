from flask import Flask, jsonify, request,session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db,User,Account
from flask_session import Session


app = Flask(__name__)
CORS(app, supports_credentials=True)
bcrypt=Bcrypt(app)
server_session=Session()
app.config.from_object(ApplicationConfig)
server_session.init_app(app)
db.init_app(app)
with app.app_context():
    db.create_all()


@app.route('/check-auth', methods=['GET'])
def check_auth():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({'isLoggedIn': True})
    else:
        return jsonify({'isLoggedIn': False})


@app.route('/user', methods=['POST'])
def add_user():
    data = request.get_json()
    user = User(name=data['name'], email=data['email'],phone=data['phone'],position=data['position'],experience=data['experience'],noticeperiod=data['noticeperiod'],location=data['location'],remarks=data['remarks'],curcompany=data['curcompany'],curctc=data['curctc'],expctc=data['expctc'],doi=data["doi"],status=data["status"],feedback=data["feedback"],createdby=data["createdby"],createddate=data["createddate"],updateddate=data["updateddate"],vendor=data["vendor"])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'New user created!'}), 201


@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'name': user.name,'phone': user.phone, 'email': user.email,'position':user.position,'experience':user.experience,'noticeperiod':user.noticeperiod,'location':user.location,'remarks':user.remarks,'curcompany':user.curcompany,'curctc':user.curctc,'expctc':user.expctc,'doi':user.doi,'status':user.status,'feedback':user.feedback,'createdby':user.createdby,'createddate':user.createddate,'updateddate':user.updateddate,'vendor':user.vendor}), 200

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        output.append({'id':user.id,'name': user.name,'phone': user.phone, 'email': user.email,'position':user.position,'experience':user.experience,'noticeperiod':user.noticeperiod,'location':user.location,'remarks':user.remarks,'curcompany':user.curcompany,'curctc':user.curctc,'expctc':user.expctc,'doi':user.doi,'status':user.status,'feedback':user.feedback,'createdby':user.createdby,'createddate':user.createddate,'updateddate':user.updateddate,'vendor':user.vendor})
    return jsonify(output), 200

@app.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.get_json()
    user.name = data['name']
    user.email = data['email']
    user.phone=data['phone']
    user.position=data['position']
    user.experience=data['experience']
    user.noticeperiod=data['noticeperiod']
    user.location=data['location']
    user.remarks=data['remarks']
    user.curcompany=data['curcompany']
    user.curctc=data['curctc']
    user.expctc=data['expctc']
    user.doi=data["doi"]
    user.status=data["status"]
    user.feedback=data["feedback"]
    user.createdby=data["createdby"]
    user.createddate=data["createddate"]
    user.updateddate=data["updateddate"]
    user.vendor=data["vendor"]
    db.session.commit()
    return jsonify({'message': 'User updated!'}), 200



@app.route("/register", methods=['POST'])
def reg_user():
    name= request.json["name"]
    email= request.json["email"]
    password= request.json["password"]

    user_exists = Account.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error":"User already exists"})


    hashed_password = bcrypt.generate_password_hash(password)
    new_user = Account(name=name,email=email,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"]= new_user.id


    return jsonify({
        "id":new_user.id,
        "email":new_user.email
    })

@app.route("/login", methods=['POST'])
def login_user():
    email = request.json["email"]
    password= request.json["password"]
    user = Account.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error":"Unauthorized"}),401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized"}),401

    session["user_id"]= user.id

    return jsonify({
        "id":user.id,
        "email":user.email
    })

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error":"Unauthorized"}),401

    user = Account.query.filter_by(id=user_id).first()
    
    return jsonify({
        "name" : user.name,
        "email":user.email
        
    })
       
@app.route("/logout", methods=['POST'])
def logout_user():
    session.pop("user_id")
    return "200"




@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted!'}), 200

    
if(__name__ == "__main__"):
    app.run()
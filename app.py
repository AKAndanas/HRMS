from flask import Flask, jsonify, request, session,make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, User, Account
from flask_session import Session
import openai
import os
import pickle
from llama_index import SimpleDirectoryReader, GPTSimpleVectorIndex, Document
from werkzeug.utils import secure_filename
from multiprocessing import Lock
from llama_index import SimpleDirectoryReader, GPTSimpleVectorIndex, Document





app = Flask(__name__)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
os.environ['OPENAI_API_KEY'] = "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"
server_session = Session()
app.config.from_object(ApplicationConfig)
server_session.init_app(app)
db.init_app(app)
with app.app_context():
    db.create_all()

index = None
stored_docs = {}
lock = Lock()

index_name = "./index.json"
pkl_name = "stored_documents.pkl"

def initialize_index():
    """Create a new global index, or load one from the pre-set path."""
    global index, stored_docs

    with lock:
        if os.path.exists(index_name):
            index = GPTSimpleVectorIndex.load_from_disk(index_name)
        else:
            index = GPTSimpleVectorIndex([])
            index.save_to_disk(index_name)

def query_index(query_text):
    """Query the global index."""
    global index
    response = index.query(query_text)
    return response


def insert_into_index(doc_file_path, doc_id=None):
    """Insert new document into global index."""
    global index, stored_docs
    document = SimpleDirectoryReader(input_files=[doc_file_path]).load_data()[0]
    if doc_id is not None:
        document.doc_id = doc_id
    
    # Keep track of stored docs -- llama_index doesn't make this easy
    stored_docs[document.doc_id] = document.text[0:200]  # only take the first 200 chars

    with lock:
        index.insert(document)
        index.save_to_disk(index_name)
        
        with open(pkl_name, "wb") as f:
            pickle.dump(stored_docs, f)

    return

def get_documents_list():
    """Get the list of currently stored documents."""
    global stored_doc
    documents_list = []
    for doc_id, doc_text in stored_docs.items():
        documents_list.append({"id": doc_id, "text": doc_text})

    return documents_list




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
    user = User(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        position=data['position'],
        experience=data['experience'],
        noticeperiod=data['noticeperiod'],
        location=data['location'],
        remarks=data['remarks'],
        curcompany=data['curcompany'],
        curctc=data['curctc'],
        expctc=data['expctc'],
        doi=data["doi"],
        status=data["status"],
        feedback=data["feedback"],
        createdby=data["createdby"],
        createddate=data["createddate"],
        updateddate=data["updateddate"],
        vendor=data["vendor"],
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'New user created!'}), 201


@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify({'name': user.name, 'phone': user.phone, 'email': user.email, 'position': user.position, 'experience': user.experience, 'noticeperiod': user.noticeperiod, 'location': user.location, 'remarks': user.remarks, 'curcompany': user.curcompany, 'curctc': user.curctc, 'expctc': user.expctc, 'doi': user.doi, 'status': user.status, 'feedback': user.feedback, 'createdby': user.createdby, 'createddate': user.createddate, 'updateddate': user.updateddate, 'vendor': user.vendor}), 200


@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        output.append({'id': user.id, 'name': user.name, 'phone': user.phone, 'email': user.email, 'position': user.position, 'experience': user.experience, 'noticeperiod': user.noticeperiod, 'location': user.location, 'remarks': user.remarks, 'curcompany': user.curcompany,
                      'curctc': user.curctc, 'expctc': user.expctc, 'doi': user.doi, 'status': user.status, 'feedback': user.feedback, 'createdby': user.createdby, 'createddate': user.createddate, 'updateddate': user.updateddate, 'vendor': user.vendor})
    return jsonify(output), 200


@app.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.get_json()
    user.name = data['name']
    user.email = data['email']
    user.phone = data['phone']
    user.position = data['position']
    user.experience = data['experience']
    user.noticeperiod = data['noticeperiod']
    user.location = data['location']
    user.remarks = data['remarks']
    user.curcompany = data['curcompany']
    user.curctc = data['curctc']
    user.expctc = data['expctc']
    user.doi = data["doi"]
    user.status = data["status"]
    user.feedback = data["feedback"]
    user.createdby = data["createdby"]
    user.createddate = data["createddate"]
    user.updateddate = data["updateddate"]
    user.vendor = data["vendor"]
    db.session.commit()
    return jsonify({'message': 'User updated!'}), 200


@app.route("/register", methods=['POST'])
def reg_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = Account.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"})

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = Account(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })


@app.route("/login", methods=['POST'])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = Account.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = Account.query.filter_by(id=user_id).first()

    return jsonify({
        "name": user.name,
        "email": user.email

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



from multiprocessing.managers import BaseManager

# initialize manager connection
# NOTE: you might want to handle the password in a less hardcoded way
manager = BaseManager(('127.0.0.1', 5602), b'password')
manager.register('query_index')
manager.register('insert_into_index')
manager.register('get_documents_list')
manager.connect()


@app.route("/query", methods=["GET"])
def query_index():
    global manager
    query_text = request.args.get("text", None)
    if query_text is None:
        return "No text found, please include a ?text=blah parameter in the URL", 400
    
    response = manager.query_index(query_text)._getvalue()
    response_json = {
        "text": str(response),
        "sources": [{"text": str(x.source_text), 
                     "similarity": round(x.similarity, 2),
                     "doc_id": str(x.doc_id),
                     "start": x.node_info['start'],
                     "end": x.node_info['end']
                    } for x in response.source_nodes]
    }
    return make_response(jsonify(response_json)), 200



@app.route("/uploadFile", methods=["POST"])
def upload_file():
    global manager
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400
    
    filepath = None
    try:
        uploaded_file = request.files["file"]
        filename = secure_filename(uploaded_file.filename)

        # Ensure the 'documents' directory exists
        if not os.path.exists('documents'):
            os.makedirs('documents')

        filepath = os.path.join('documents', os.path.basename(filename))
        uploaded_file.save(filepath)

        if request.form.get("filename_as_doc_id", None) is not None:
            manager.insert_into_index(filepath, doc_id=filename)
        else:
            manager.insert_into_index(filepath)
    except Exception as e:
        # cleanup temp file
        if filepath is not None and os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({"error": str(e)}), 500

    # cleanup temp file
    if filepath is not None and os.path.exists(filepath):
        os.remove(filepath)

    return "File inserted!", 200




@app.route("/getDocuments", methods=["GET"])
def get_documents():
    document_list = manager.get_documents_list()._getvalue()

    return make_response(jsonify(document_list)), 200

if (__name__ == "__main__"):
    initialize_index()
    app.run(debug=True)

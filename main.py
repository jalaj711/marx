from typing import Dict
import flask
import json
from bson.objectid import ObjectId
from pymongo import MongoClient

client = MongoClient("localhost", 27017)
db = client['marx']
notes = db['notes']
app = flask.Flask(__name__)

def _convert_obj_id(lst):
    for i in range(len(lst)):
        d = {}
        d.update(lst[i])
        if "_id" in d:
            d['_id'] = str(d['_id'])
        lst[i] = d
    return lst

@app.route("/api/get_notes")
def get_notes():
    return json.dumps(_convert_obj_id(list(notes.find())))

@app.route("/api/create_note", methods=["POST"])
def create_note():
    data: Dict = json.loads(flask.request.get_data(as_text=True))
    if "title" not in data:
        return "Title not provided", 400
    notes.insert_one({
        "title": data['title'],
        "desc": data.get("desc", None)
    })
    return json.dumps(_convert_obj_id(list(notes.find())))

@app.route("/api/delete_note", methods=["POST"])
def delete_note():
    data: Dict = json.loads(flask.request.get_data(as_text=True))
    if "id" not in data:
        return "ID not provided", 400
    notes.delete_one({
        "_id": ObjectId(data['id'])
    })
    return json.dumps(_convert_obj_id(list(notes.find())))

if __name__ == "__main__":
    app.run()

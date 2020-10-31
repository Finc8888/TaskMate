from flask import Flask, request, make_response,jsonify
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = '#Tm31415926'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@localhost/task_mate'

# manager = Manager(app)
db = SQLAlchemy(app)


@app.route('/')
def index():
    return 'Hello World'

@app.route('/tasks/<id>')
def tasks(id):
    json = jsonify({"text":"ID this task is 8"})
    res = make_response(json)
    res.headers['Content-Type'] = 'application/json'
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Server'] = 'Foobar'
    return res

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text(), nullable=False)
    urgent = db.Column(db.Boolean(), default=False, nullable=False)
    important = db.Column(db.Boolean(), default=False, nullable=False)
    comments = db.Column(db.Text(), nullable=True)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
	    return "<{}:{}>".format(self.id,  self.title[:10])

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, make_response,jsonify,request,render_template
from datetime import datetime
from flask_cors import CORS
from waitress import serve
import os

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes
app.config['SECRET_KEY'] = '#Tm31415926'
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql+psycopg2://{os.environ.get('DATABASE_URL').split('//')[1] if os.environ.get('DATABASE_URL') else 'postgres:postgres@localhost/task_mate'}"

# manager = Manager(app)
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/task')
def task():
    return render_template('task.html')

@app.route('/counting')
def counting():
    return render_template('counting.html')



@app.route('/create_task/', methods=['post', 'get'])
def create_task():
    message = ''
    if request.method == 'POST':
        name = request.form.get('name')  # запрос к данным формы
        comments = request.form.get('comments')
        item = Task(name=name,comments=comments)
        db.session.add(item)
        db.session.commit()
    return str('True')


@app.route('/create_tasks/')
def create_tasks():
    task_list = [
    'Напилить дров',
    'Прибраться за ширмой',
    'Прибраться где были уточки',
    'Покосить',
    'Сходить за мясом']
    for task in task_list:
        item = Task(name=task)
        db.session.add(item)
    db.session.commit()
    data = list(db.session.query(Task).all())
    if len(data):
        return str(True)

@app.route('/get_all_tasks')
def get_all_tasks():
    data = db.session.query(Task).all()
    response_data = []
    for task in data:
        item = task.as_dict()
        response_data.append(item)
    json_data = jsonify(response_data)
    # json_data = json.dumps(data)
    res = make_response(json_data)
    res.headers['Content-Type'] = 'application/json'
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Server'] = 'Foobar'
    return res

@app.route('/truncate_tasks', methods=['post', 'delete'])
def truncate_tasks():
    if request.method == 'POST':
        for task in db.session.query(Task).all():
            db.session.delete(task)
        db.session.commit()
        return str(True)

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text(), nullable=False)
    is_urgent = db.Column(db.Boolean(), default=False, nullable=False)
    is_important = db.Column(db.Boolean(), default=False, nullable=False)
    is_archive = db.Column(db.Boolean(), default=False, nullable=False)
    comments = db.Column(db.Text(), nullable=True)
    created_on = db.Column(db.DateTime(), default=datetime.now)
    updated_on = db.Column(db.DateTime(), default=datetime.now, onupdate=datetime.now)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    # def __repr__(self):
	#     return "<{}:{}>".format(self.id,  self.name[:10])

@app.route('/create_all_table')
def create_all_table():
    db.create_all()
    return str(True)

def get_port():
    return int(os.environ.get("PORT", 5000))

if __name__ == "__main__":
    app.run()

serve(app, port=get_port(), host='0.0.0.0')

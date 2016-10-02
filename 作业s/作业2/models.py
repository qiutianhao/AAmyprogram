from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import time
import json
app = Flask(__name__)
app.secret_key = 'skey'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)


def cur_time():
    format = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(format, value)
    return str(dt)


class Model(object):
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Todo(db.Model, Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String())
    created_time = db.Column(db.String())

    def __init__(self, form):
        self.task = form.get('task')
        self.created_time = cur_time()

    def json(self):
        j = {
            'id': self.id,
            'task': self.task,
            'created_time': self.created_time,
        }
        return json.dumps(j, ensure_ascii=False)


def db_build():
    print('rebuild database')
    db.drop_all()
    db.create_all()

if __name__ == '__main__':
    db_build()

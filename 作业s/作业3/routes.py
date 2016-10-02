from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import Blueprint
from models import Todo
import json
main = Blueprint('todo', __name__)


@main.route('/')
def index():
    todos = Todo.query.all()
    return render_template('index.html', todos=todos)


@main.route('/add', methods=['POST'])
def add():
    form = request.form
    todo = Todo(form)
    print('todo', todo)
    todo.save()
    r = dict(
        data=todo.json(),
        success=True,
    )
    return json.dumps(r, ensure_ascii=False)


@main.route('/delete/<int:todo_id>')
def delete(todo_id):
    todo = Todo.query.get(todo_id)
    todo.delete()
    print('todo of delete', todo)
    r = dict(
        success=True,
    )
    return json.dumps(r, ensure_ascii=False)


@main.route('/edit', methods=['POST'])
def edit():
    form = request.form
    todo_id = form.get('todo_id')
    todo = Todo(form)
    print('todo, todo_id', todo, todo_id)
    todo.save()
    Todo.query.get(todo_id).delete()
    r = dict(
        data=todo.json(),
        success=True,
    )
    return json.dumps(r, ensure_ascii=False)

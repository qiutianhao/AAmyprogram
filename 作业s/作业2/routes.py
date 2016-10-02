from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import Blueprint
from models import Todo

main = Blueprint('todo', __name__)


@main.route('/')
def index():
    todos = Todo.query.all()
    return render_template('index.html', todos=todos)


@main.route('/add', methods=['POST'])
def add():
    form = request.form
    todo = Todo(form)
    todo.save()
    return redirect(url_for('.index'))


@main.route('/delete/<int:todo_id>')
def delete(todo_id):
    todo = Todo.query.get(todo_id)
    print('todo_id, todo', todo_id, todo)
    todo.delete()
    return redirect(url_for('.index'))


@main.route('/edit_view/<int:todo_id>')
def edit_view(todo_id):
    todo = Todo.query.get(todo_id)
    return render_template('edit.html', todo=todo)


@main.route('/edit/<int:todo_id>', methods=['POST'])
def edit(todo_id):
    todo = Todo.query.get(todo_id)
    todo.delete()
    form = request.form
    t = Todo(form)
    t.save()
    return redirect(url_for('.index'))


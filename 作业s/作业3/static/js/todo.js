var todoTemplate = function (t) {
    var todo
    if (t == undefined) {
        todo = {}
    }
    else {
        todo = t
    }
    return `
    <div class="todo-item">
        <span class="todo-content">
            ${ todo.todo_id }
            ${ todo.task }
            ${ todo.created_time}
        </span>
        <button type="submit" class="todo-edit-button">Edit</button>
        <button type="submit" class="todo-delete-button" data-id=${ todo.todo_id }>Delete</button>
        <div class="todo-edit" style="display: none">
            <input class="todo-edit-input" name="todo-edited" placeholder="Edit Todo">
            <button type="submit" class="todo-edit-submit-button" data-id=${ todo.todo_id }>Edit</button>
        </div>
    </div>
    `
}

var todoEditToggle = function () {
    $('.todo-items').on('click', '.todo-edit-button', function () {
        console.log('edit this', $(this))
        $(this).next().next().slideToggle()
    })
}

var todoAdd = function () {
    $('#todo-add-button').on('click', function () {
        var todo = $('#todo-add-input').val()
        var todo_items = $('.todo-items')
        var form = {
            task: todo,
        }
        var response = function (todo) {
            todo_items.prepend(todoTemplate(todo.data))
            console.log('added')
        }
        api.add(form, response)
    })
}

var todoDelete = function () {
    $('.todo-items').on('click', '.todo-delete-button', function () {
        var button = $(this)
        var todo_id = $(this).data('id')
        var response = function () {
            button.parent().remove()
            console.log('removed')
        }
        api.delete(todo_id, response)
    })
}

var todoEdit = function () {
    $('.todo-items').on('click', '.todo-edit-submit-button', function () {
        var button = $(this)
        var todo_edited = $(this).prev().val()
        var todo_items = $('.todo-items')
        var form = {
            task: todo_edited,
            todo_id: $(this).data('id')
        }
        console.log('edit this', $(this), form)
        var response = function (todo) {
            button.closest('.todo-item').remove()
            todo_items.prepend(todoTemplate(todo.data))
            console.log('removed and added')
        }
        api.edit(form, response)

    })
}

var bindEvents = function () {
    todoAdd()
    todoTemplate()
    todoEditToggle()
    todoEdit()
    todoDelete()
}

$(document).ready(function () {
    bindEvents()
})
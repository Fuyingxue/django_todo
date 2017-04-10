var todoTemplate = function(todo) {
    var t = `
        <tr>
            <td>
                <span class="todo-id" style="display:none">${todo.id}</span>
                <span class="todo-index">${todo.index}</span>
            </td>
            <td>
                <span class="todo-task">${todo.task}</span>
                <input class="todo-edit-input" style="display:none">
            </td>
            <td><span class="todo-created-time">${todo.created_time}</span></td>
            <td><span class="todo-updated-time">${todo.updated_time}</span></td>
            <td>
                <button class="todo-button todo-edit"><i class="icon-edit icon-large"></i></button>
                <button class="todo-button todo-update" style="display:none"><i class="icon-ok icon-large"></i></button>
            </td>
            <td><button class="todo-button todo-delete"><i class="icon-trash icon-large"></i></button></td>
        </tr>
    `
    return t
}

var insertTodo = function(todo) {
    var todoCell = todoTemplate(todo)
    var todoList = e('.todo-list')
    var todoListBody = todoList.querySelector('tbody')
    todoListBody.insertAdjacentHTML('beforeend', todoCell)
}

var loadTodoList = function() {
    apiTodoAll(function(r) {
        var r = JSON.parse(r)
        var todoList = r.todo_list
        for (var i = 0; i < todoList.length; i++) {
            var todo = todoList[i]
            todo.index = i + 1
            insertTodo(todo)
        }
    })
}

var bindEventTodoAdd = function() {
    var b = e('#id-button-add')
    var todoList = e('.todo-list')
    b.addEventListener('click', function() {
        var input = e('#id-input-todo')
        var form = {
            'task': input.value,
        }
        apiTodoAdd(form, function(r) {
            var todo = JSON.parse(r)
            var todoLength = todoList.rows.length
            if (todoLength > 1) {
                var lastTodo = todoList.rows[todoLength - 1]
                var lastTodoId = lastTodo.querySelector('.todo-index').innerText
                todo.index = parseInt(lastTodoId) + 1
            } else {
                todo.index = 1
            }
            insertTodo(todo)
            input.value = ''
        })
    })
}

var bindEventTodoEdit = function() {
    var todoList = e('.todo-list')
    todoList.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('icon-edit')) {
            var tr = self.closest('tr')
            var todoTask = tr.querySelector('.todo-task')
            var input = tr.querySelector('.todo-edit-input')
            var task = todoTask.innerText
            var todoUpdate = tr.querySelector('.todo-update')
            var todoEdit = self.parentElement
            input.value = todoTask.innerText
            todoTask.style.display = 'none'
            input.style.display = 'inline-block'
            todoEdit.style.display = 'none'
            todoUpdate.style.display = 'inline-block'
        }
    })
}

var bindEventTodoUpdate = function() {
    var todoList = e('.todo-list')
    todoList.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('icon-ok')) {
            var tr = self.closest('tr')
            var todoId = tr.querySelector('.todo-id')
            var todoTask = tr.querySelector('.todo-task')
            var input= tr.querySelector('.todo-edit-input')
            var task = input.value
            var todoEdit = tr.querySelector('.todo-edit')
            var todoUpdate = self.parentElement
            form = {
                'id': todoId.innerText,
                'task': input.value,
            }
            apiTodoUpdate(form, function(r){
                todo = JSON.parse(r)
                todoTask.innerText = todo.task
            })
            todoTask.style.display = 'inline'
            input.style.display = 'none'
            todoUpdate.style.display = 'none'
            todoEdit.style.display = 'inline-block'
        }
    })
}

var bindEventTodoDelete = function() {
    var todoList = e('.todo-list')
    todoList.addEventListener('click', function(event) {
        var self = event.target
        if (self.classList.contains('icon-trash')) {
            var tr = self.closest('tr')
            var todoId = tr.querySelector('.todo-id')
            if (confirm('确定要删除这条 todo ？')) {
                apiTodoDelete(todoId.innerText, function(r) {
                    var todo = JSON.parse(r)
                    tr.remove()
                })
            }
        }
    })
}

var bindEvents = function() {
    bindEventTodoAdd()
    bindEventTodoEdit()
    bindEventTodoUpdate()
    bindEventTodoDelete()
}

var __main = function() {
    bindEvents()
    loadTodoList()
}

__main()

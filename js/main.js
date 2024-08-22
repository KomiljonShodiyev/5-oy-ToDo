const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const allBtn = document.getElementById('all-btn');
const completedBtn = document.getElementById('completed-btn');
const uncompletedBtn = document.getElementById('uncompleted-btn');

let todos = [];
let filter = "all"; 

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
    }
});

allBtn.addEventListener('click', () => {
    filter = "all";
    renderTodos();
});

completedBtn.addEventListener('click', () => {
    filter = "completed";
    renderTodos();
});

uncompletedBtn.addEventListener('click', () => {
    filter = "uncompleted";
    renderTodos();
});

function renderTodos() {
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (filter === "completed") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === "uncompleted") {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <span onclick="toggleTodoComplete(${todo.id})">${todo.text}</span>
            <div>
                <button class="edit" onclick="editTodo(${todo.id})">✏️</button>
                <button class="delete" onclick="deleteTodo(${todo.id})">🗑️</button>
            </div>
        `;

        todoList.appendChild(todoItem);
    });
}

function toggleTodoComplete(id) {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const newText = prompt("Edit your task:", todo.text);

    if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

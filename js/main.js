let elForm = document.querySelector(".todo-form");
let elList = document.querySelector(".todo-list");

let modalWrapper = document.querySelector("#modal-wrapper");
let modal = document.querySelector(".modal");

let allCount = document.querySelector("#all-count");
let completedCount = document.querySelector("#completed-count");
let uncompletedCount = document.querySelector("#uncompleted-count");

let allBtn = document.querySelector("#all-btn");
let completedBtn = document.querySelector("#completed-btn");
let uncompletedBtn = document.querySelector("#uncompleted-btn");

let elChooseInput = document.querySelector(".img-input");
let elChooseImg = document.querySelector(".img-icon");

let modalImgInput = document.querySelector(".modal-img-input");
let modalImg = document.querySelector(".modal-img");

let todos = JSON.parse(window.localStorage.getItem("todos")) || [];
let chosenImg = null;

function saveTodos() {
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos(arr, list) {
    list.innerHTML = "";
    arr.forEach((item, index) => {
        let elItem = document.createElement("li");
        elItem.className = `todo-item ${item.isCompleted ? 'completed' : ''}`;
        elItem.innerHTML = `
            <span>${index + 1}. ${item.value}</span>
            <div>
                <img src="${item.imgUrl || './images/default.png'}" alt="todo image">
                <button class="complete-btn" onclick="toggleComplete(${item.id})">Complete</button>
                <button class="edit-btn" onclick="editTodo(${item.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${item.id})">Delete</button>
            </div>
        `;
        list.appendChild(elItem);
    });
    updateCounts();
}

function updateCounts() {
    allCount.textContent = todos.length;
    completedCount.textContent = todos.filter(todo => todo.isCompleted).length;
    uncompletedCount.textContent = todos.filter(todo => !todo.isCompleted).length;
}

function toggleComplete(id) {
    let todo = todos.find(todo => todo.id === id);
    todo.isCompleted = !todo.isCompleted;
    saveTodos();
    renderTodos(todos, elList);
}

function editTodo(id) {
    let todo = todos.find(todo => todo.id === id);
    modal.querySelector(".modal-input").value = todo.value;
    modalImg.src = todo.imgUrl || './images/default.png';
    modalWrapper.style.display = 'flex';

    modalImgInput.addEventListener("change", function (e) {
        todo.imgUrl = URL.createObjectURL(e.target.files[0]);
        modalImg.src = todo.imgUrl;
    });

    document.querySelector(".save-btn").onclick = function () {
        todo.value = modal.querySelector(".modal-input").value;
        saveTodos();
        renderTodos(todos, elList);
        modalWrapper.style.display = 'none';
    };
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos(todos, elList);
}

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        id: todos.length + 1,
        value: e.target[0].value,
        imgUrl: chosenImg,
        isCompleted: false,
    };
    todos.push(data);
    saveTodos();
    elChooseImg.src = "./images/upload-img.svg";  
    renderTodos(todos, elList);
    e.target.reset();
});

modalWrapper.addEventListener("click", function (e) {
    if (e.target.id === "modal-wrapper") {
        modalWrapper.style.display = 'none';
    }
});

elChooseImg.addEventListener("click", function() {
    elChooseInput.click();
});

elChooseInput.addEventListener("change", function(e) {
    if (e.target.files.length > 0) {
        chosenImg = URL.createObjectURL(e.target.files[0]);
        elChooseImg.src = chosenImg;
    }
});

renderTodos(todos, elList);

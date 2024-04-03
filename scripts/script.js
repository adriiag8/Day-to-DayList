const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const totalTasks = document.querySelector(".total-tasks span");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
        createTask(task);
    });
}

// Submit form
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.name;
    const inputValue = input.value;

    if (inputValue != "") {
        const task = {
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTask(task);
        todoForm.reset();
    }
    input.focus();
});

//remove task
todoList.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("remove-task") ||
        e.target.parentElement.classList.contains("remove-task")
    ) {
        const taskId = e.target.closest("li").id;
        removeTask(taskId);
    }
});

// update task - change status or name
todoList.addEventListener("input", (e) => {
    const taskId = e.target.closest("li").id;
    updateTask(taskId, e.target);
});

// Prevent new lines with Enter
todoList.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
    }
});

// create task
function createTask(task) {
    const taskEl = document.createElement("li");
    taskEl.setAttribute("id", task.id);
    const taskElMarkup = `
    <div class="checkbox-wrapper">
        <input type="checkbox"  id="${task.name}-${task.id}" name="tasks" ${task.isCompleted ? "checked" : ""}>
        
        <label for="${task.name}-${task.id}">
        </label>
        <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
    </div>
    <button class="remove-task" title="Remove ${task.name} task"> 
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-xbox-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" /><path d="M9 8l6 8" /><path d="M15 8l-6 8" /></svg>
    </button>
    `;

    taskEl.innerHTML = taskElMarkup;
    todoList.appendChild(taskEl);
    countTasks();
}

// delete task
function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(taskId).remove();
    countTasks();
}


//update task
function updateTask(taskId, el) {
    const task = tasks.find((task) => task.id === parseInt(taskId));

    if (el.hasAttribute("contentEditable")) {
        task.name = el.textContent;
    } else {
        const span = el.nextElementSibling.nextElementSibling;
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) {
            span.removeAttribute("contenteditable");
            el.setAttribute("checked", "");
        } else {
            el.removeAttribute("checked");
            span.setAttribute("contenteditable", "");
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    countTasks();
}

// count number of tasks
function countTasks() {
    totalTasks.textContent = tasks.length;
    const completedTasksArray = tasks.filter((task) => task.isCompleted === true);
    completedTasks.textContent = completedTasksArray.length;
    remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

// Modo Dark para Web
function darkMode() {
    const body = document.body;
    body.classList.toggle("darkMode");
}
document.addEventListener('DOMContentLoaded',loadTask);

function loadTask(){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask(){
    taskInput = document.getElementById('taskInput');
    taskValue = taskInput.value;

    if (taskValue === "") {
        alert("Task cannot be empty!");
        return;
    }

    addTaskToDOM(taskValue);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskValue);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
    taskInput.value = "";
}

function addTaskToDOM(taskValue){
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <div class="task-actions">
            <span class="edit" onclick="editTask(this)">
                <i class="fa-solid fa-pen"></i>
            </span>
            <span class="delete btn btn-danger" onclick="deleteTask(this)">
                <i class="fa-solid fa-trash-can"></i>
            </span>
        </div>
    `;
    ul.appendChild(li);
}

function editTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.querySelector(".task-text");
    let oldTask = taskText.innerText;

    let updatedTask = prompt("Edit your task: ",oldTask);

    if (updatedTask == null) 
        return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldTask);

    if (index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskText.innerText = updatedTask;
    }
}

function deleteTask(element){
    let li = element.parentElement.parentElement;
    let taskValue = li.firstElementChild.innerText;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskValue);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    li.remove();
}
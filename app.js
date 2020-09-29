const todoInput = document.getElementById("todo-input");
const todoButtonAdd = document.getElementById("todo-button-add");
const todoTaskList = document.getElementById("task-list");

let tasks = [];


function renderTasks() {
    todoTaskList.innerHTML = "";
    tasks.forEach(t => {
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("task-id", t.id)
        if (t.isCompleted == false){
            tableRow.innerHTML = `
                <td>${t.text}</td>
                <td><i class="fa fa-circle-thin edit"></i></td>
                `;
        } else {
            tableRow.innerHTML = `
                <td>${t.text}</td>
                <td><i class="fa fa-circle edit" style="color:green"></i></td>
                `;
        }
        todoTaskList.appendChild(tableRow);
    })
    
}

function addTask() {
    let taskText = todoInput.value;
    let task = {
        id: UUID.generate(),
        text: taskText,
        isCompleted: false
    }
    tasks.push(task);
    renderTasks();
}

function performActionOnTask(e) {
    const taskId = e.target.parentElement.parentElement.getAttribute("task-id");
    if (!taskId) {
        return;
    }

    // set task to completed
    tasks.forEach(t => {
        if (t.id == taskId) {
            t.isCompleted = !t.isCompleted
        }
    })

    renderTasks();
}

todoButtonAdd.addEventListener("click", function(e) {
    console.log("Button clicked");
    addTask();
})

todoTaskList.addEventListener("click", function(e){
    performActionOnTask(e)
})
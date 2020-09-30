// Get reference to our DOM objects
const todoInput = document.getElementById("todo-input"); // in the HTML we have our <input id="todo-input"
const todoButtonAdd = document.getElementById("todo-button-add"); // in the HTML we have our + button id set to todo-button-add
const todoTaskList = document.getElementById("task-list"); // inside our HTML we have our <tbody id="task-list"

// our state of the application is a list of tasks
let tasks = [];

// a function that renders our list of tasks
function renderTasks() {
  // set our <tbody> to empty again so we can add all our tasks
  todoTaskList.innerHTML = "";

  // loop through all our tasks
  tasks.forEach((t) => {
    // create a <tr> </tr> element in our DOM
    const tableRow = document.createElement("tr");
    // set an attribute to tr so we can know which row relates to which task in our array (tasks). <tr task-id="some UUID we generated"></tr>
    tableRow.setAttribute("task-id", t.id);
    // depending on the state of the task (isCompleted being true or false) we render our tasks differently (the green circle)
    if (t.isCompleted == false) {
      // we add three <td></td> elements inside our <tr> element
      // 
      tableRow.innerHTML = `
                <td>${t.text}</td>
                <td><i data-action="complete-task" class="fa fa-circle-thin edit"></i></td>
                <td><i data-action="delete-task" class="fa fa-trash-o edit" style="cursor: pointer;"></i></td>
                `;
    } else {
      // we add three <td></td> elements inside our <tr> element
      tableRow.innerHTML = `
                <td>${t.text}</td>
                <td><i data-action="complete-task" class="fa fa-circle edit" style="color:green"></i></td>
                <td><i data-action="delete-task" class="fa fa-trash-o edit" style="cursor: pointer;"></i></td>
                `;
    }

    // finally we add our newly created <tr> element to our DOM <tbody> element
    // todoTaskList is a variable that holds a reference to the <tbody> element
    // tableRow is a new DOM <tr> element that has three <td> elements inside of it (we added it by setting innerHTML above)
    todoTaskList.appendChild(tableRow);
  });
}

// function that adds a task to the list
function addTask() {
  // get the text we want to add to our list of tasks
  let taskText = todoInput.value;
  // create a task datastructure that contains the text, id, and a flag to see if the task is completed
  // initially the task will not be completed
  let task = {
    id: UUID.generate(), // here we use our UUID library to generate a Universally Unique Identifier that we use to identify a specific task
    text: taskText,
    isCompleted: false,
  };
  // add the task we created to our list of tasks
  tasks.push(task);
  // render the list of tasks
  renderTasks();
  // reset the input text to blank
  todoInput.value = "";
}

// function that removes a task from the array of tasks
function deleteTask(taskId) {
    // to remove an item at a specific index you can use splice
    // we need to find which element to remove first, we can use findIndex for that
    // findIndex takes in an arrow function that is the comparator 
    // (inside tasks, find the task that has a property called id that is equal to the value of taskId)
    let indexToRemove = tasks.findIndex(x => x.id == taskId);
    tasks.splice(indexToRemove, 1);
}

function completeTask(taskId) {
  tasks.forEach((t) => {
      if (t.id == taskId) {
        t.isCompleted = !t.isCompleted;
      }
    });
}

function performActionOnTask(e) {
  // here we traverse the DOM to find the taskId attribute
  // below is the expected DOM at the time of clicking the complete task / or delete task
  /*
    <tr task-id="someid">
        <td>Sample task text</td>
        <td>
            <i data-action="complete-task" class="fa fa-circle edit" style="cursor:poitner; color:green">
        </td>
        <td>
            <i data-action="delete-task" class="fa fa-trash-o edit" style="cursor: pointer;">
        </td>
    </tr>
  */
 // if we click on the Image (the <i> element), e.targe will be the Image element (<i>)
 // <i> has a parent element of <td>
 // <td> has a parent element of <tr>
 // <tr> has an attribute called task-id (above example its <tr task-id="someid">)
 // in above example, our variable below (const taskId) will be set to the "someId" string if the image was clicked
  const taskId = e.target.parentElement.parentElement.getAttribute("task-id");
  
  // if we clicked on a different element, say <td> and not <i>, then the element we are trying to get an attribute 
  // for task-id for wont have it. const taskId will then be set to null or undefined. In javasript both those values 
  // are falsy values and we can using boolean logic to see that
  // if(!taskId) is equivalent to if(taskId == false)
  if (!taskId) {
    return; // when we call return, we leave the function immediately, therefore none of the code below this will be executed
  }

  // find out what action we are performing using the data-action attribute we set up when we render the tasks
  // notice how our <i> elements have an attribute called data-action. This is a way we can determine which image was clicked
  // if the delete image was clicked, the action will be delete-task, if the circle was clicked it will be complete task
  // <i data-action="complete-task"... vs <i data-action="delete-task"...
  const action = e.target.getAttribute("data-action");

  if (action == "complete-task") {
    // set task to completed
    completeTask(taskId);
  } else if(action == "delete-task") {
    // delete the task
    deleteTask(taskId);
  }

  // render our tasks again after we have edited our tasks
  renderTasks();
}

// Add our event listeners
todoButtonAdd.addEventListener("click", function (e) {
  addTask();
});

todoTaskList.addEventListener("click", function (e) {
  performActionOnTask(e);
});

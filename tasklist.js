class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    removeTaskWithId(id) {
      let index = this.tasks.findIndex(x => x.taskId == id);
      this.tasks.splice(index, 1);
    }
  
    completeTaskWithId(id) {
      this.tasks.forEach(t => {
        if(t.id === id) {
          t.completeTask()
        }
      })
    }
  }
  
  class Task {
    constructor(text) {
      this.id = UUID.generate();
      this.text = text;
      this.isCompleted = false;
    }
  
    completeTask () {
      this.isCompleted = true;
    }
  
    editTask(newText) {
      this.text = newText;
    }
  
    getHtmlOutput() {
      if (this.isCompleted == false) {
  
        return `
                  <td>${this.text}</td>
                  <td><i data-action="complete-task" class="fa fa-circle-thin edit"></i></td>
                  <td><i data-action="delete-task" class="fa fa-trash-o edit" style="cursor: pointer;"></i></td>
                  `;
      } else {
        return `
                  <td>${this.text}</td>
                  <td><i data-action="complete-task" class="fa fa-circle edit" style="color:green"></i></td>
                  <td><i data-action="delete-task" class="fa fa-trash-o edit" style="cursor: pointer;"></i></td>
                  `;
      }
    }
  }
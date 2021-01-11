// capture the form

const todoForm = document.querySelector(".todo-form");
// define tasks-array

let tasks = JSON.parse(localStorage.getItem("todos")) || [];

// handling form submit event

todoForm.addEventListener("submit", function(e) {
// preventing the form being submitted
  e.preventDefault();
  
 // Grabbing the input value 
  const inputValue = document.querySelector("#input").value.trim();
   
  if (inputValue != "") {

// set the task object
    const task = {
      id: new Date().getTime(),
      name: inputValue,
      
    };

  // checking the existing tasks

    for(i=0; i<tasks.length ; i++)
    {
      if(tasks[i].name === inputValue)
      {
        return document.querySelector('.msg').innerHTML = 'Item Already Exists!!!';
      }
    }

    // pushing task into tasks-array
   
    tasks.push(task);
    // saving into localstorage

    localStorage.setItem("todos", JSON.stringify(tasks));
    // creating each task

    createTask(task);

    document.querySelector('.msg').classList.remove('err-msg');
    document.querySelector('.msg').innerHTML = 'Your Tasks:';
   
    todoForm.reset();

  }
  else{
    // if input value is not given

    document.querySelector('.msg').classList.add('err-msg');
    document.querySelector('.msg').innerHTML = 'Please Enter a Valid Item!!!';
  }
  
  input.focus();
}); 

// showing tasks after loading every time

if (localStorage.getItem("todos") !== JSON.stringify([])) {
  tasks.map((task) => {
    createTask(task);
  });
}else{
    document.querySelector('.msg').classList.add('err-msg');
    document.querySelector('.msg').innerHTML = 'Add tasks to get started!!!';
}



function createTask(task) {
  const taskName = document.createElement("li");
  taskName.setAttribute("id", task.id);
  taskName.setAttribute("class", "li-item");
  const taskMarkup = `
    <div class="" id="task-item">
    <div>
      <input type="checkbox" class="box-${task.id}" id="${task.id}" class="checkbox">
      
      <span class="task-name">${task.name}</span>
    </div>
      
      <button id="btn">Delete</button>
    </div>
`;

  taskName.innerHTML = taskMarkup;
  const todoList = document.querySelector("#todoList");
  todoList.appendChild(taskName);

}

// handling remove event

const todoList = document.querySelector("#todoList");
 
todoList.addEventListener("click", (e) => {
 
  if (e.target.id === "btn" ) {
    
    
    const taskId = e.target.closest("li").id;
  
    removeTask(taskId);
   }


  
});

function removeTask(taskId) {
  
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
 
  localStorage.setItem("todos", JSON.stringify(tasks));
 
  document.getElementById(taskId).remove();

  if (localStorage.getItem("todos") === JSON.stringify([])) {
    document.querySelector('.msg').classList.add('err-msg');
    document.querySelector('.msg').innerHTML = 'Add tasks to get started!!!';

  }

}

// handling complete-task event

todoList.addEventListener('change', (e) => {
      const taskID = e.target.id;
      doneTask(taskID);
});

function doneTask(taskID) {
      const x = document.querySelector(`.box-${taskID}`);
      x.nextElementSibling.classList.toggle('checked');
}
 

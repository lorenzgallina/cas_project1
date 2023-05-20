let y = 3;
let x = 3 + y;
const value = add(x, y);
(value > 10) ? console.log("Big") : console.log("Small");

function add(a, b) {
    // debugger;
    return a + b;
}

function saveToLocalStorage() {
    let userName = document.getElementById('username').value;
    localStorage.setItem('userName', userName);
}

function retrieveFromLocalStorage() {
    let storedUserName = localStorage.getItem('userName');
    
    if(storedUserName) {
        alert('The stored user name is ' + storedUserName);
    } else {
        alert('No user name is stored.');
    }
}



window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (tasks) {
        tasks.forEach(function(task) {
            displayTask(task);
        });
    }
}

// Function to add a task
function addTask() {
    let newTaskInput = document.getElementById('newTask');
    let newTask = newTaskInput.value;
    newTaskInput.value = '';

    // Store the task in localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Display the task in the list
    displayTask(newTask);
}

// Function to display a task
function displayTask(task) {
    let taskList = document.getElementById('taskList');
    
    let listItem = document.createElement('li');
    listItem.textContent = task;
    
    taskList.appendChild(listItem);
}

function testmyjs() {
    
    console.log("Test");
}

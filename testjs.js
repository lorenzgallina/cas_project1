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
    let newNoteInput = document.getElementById('newNote');
    let newDueDateInput = document.getElementById('newDueDate');
    let newTask = {
        task: newTaskInput.value,
        note: newNoteInput.value,
        dueDate: newDueDateInput.value,
        completed: false
    };
    newTaskInput.value = '';
    newNoteInput.value = '';
    newDueDateInput.value = '';

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
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.addEventListener('change', function() {
        task.completed = checkBox.checked;
        updateLocalStorage();
    });

    let taskDiv = document.createElement('div');

    let taskLabel = document.createElement('strong');
    taskLabel.textContent = 'Task: ';

    let taskText = document.createElement('span');
    taskText.textContent = task.task;
    taskText.addEventListener('focusout', function() {
        task.task = taskText.textContent;
        updateLocalStorage();
    });

    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(taskText);

    let noteDiv = document.createElement('div');

    let noteLabel = document.createElement('strong');
    noteLabel.textContent = 'Note: ';

    let noteText = document.createElement('span');
    noteText.textContent = task.note;
    noteText.addEventListener('focusout', function() {
        task.note = noteText.textContent;
        updateLocalStorage();
    });

    noteDiv.appendChild(noteLabel);
    noteDiv.appendChild(noteText);

    let dueDateDiv = document.createElement('div');

    let dueDateLabel = document.createElement('strong');
    dueDateLabel.textContent = 'Due Date: ';

    let dueDateText = document.createElement('span');
    dueDateText.textContent = task.dueDate;
    dueDateText.addEventListener('focusout', function() {
        task.dueDate = dueDateText.textContent;
        updateLocalStorage();
    });

    dueDateDiv.appendChild(dueDateLabel);
    dueDateDiv.appendChild(dueDateText);

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        taskText.contentEditable = true;
        noteText.contentEditable = true;
        dueDateText.contentEditable = true;
        saveButton.style.display = 'inline'; // Show the save button
    });

    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none'; // Hide the save button by default
    saveButton.addEventListener('click', function() {
        taskText.contentEditable = false;
        noteText.contentEditable = false;
        dueDateText.contentEditable = false;
        saveButton.style.display = 'none'; // Hide the save button
    });

    listItem.appendChild(checkBox);
    listItem.appendChild(taskDiv);
    listItem.appendChild(noteDiv);
    listItem.appendChild(dueDateDiv);
    listItem.appendChild(editButton);
    listItem.appendChild(saveButton);
    taskList.appendChild(listItem);
}

// Function to update tasks in localStorage
function updateLocalStorage() {
    let taskListItems = Array.from(document.getElementById('taskList').children);
    let tasks = taskListItems.map(function(listItem) {
        let taskSpan = listItem.querySelector('span');
        let noteSpan = listItem.querySelector('span:nth-child(3)');
        let dueDateSpan = listItem.querySelector('span:nth-child(4)');
        let checkBox = listItem.querySelector('input[type="checkbox"]');
        if(taskSpan && noteSpan && dueDateSpan && checkBox) {
            return {
                task: taskSpan.textContent,
                note: noteSpan.textContent,
                dueDate: dueDateSpan.textContent,
                completed: checkBox.checked
            };
        } else {
            return null;
        }
    }).filter(element => element !== null);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

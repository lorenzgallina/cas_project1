document.addEventListener('DOMContentLoaded', (event) => {
    getNotesFromBackend().then(notes => {
        displayNoteList(notes);
    });
});

// Function to fetch notes from the backend server
function getNotesFromBackend() {
    return fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(notes => {
            return notes;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Function to display the notes list
function displayNoteList(notes) {
    let noteList = document.getElementById('noteList');
    if (noteList) {
        noteList.innerHTML = '';
        notes.forEach(function(note) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
            <span class="label">Titel:</span> 
            <span class="value">${note.note}</span> 
            <span class="label">Beschreibung:</span> 
            <span class="value">${note.note_description}</span> 
            <span class="label">Deadline:</span> 
            <span class="value">${note.due_date}</span> 
            <span class="label">Done:</span> 
            <span class="value" data-done="${note.done ? 'Yes' : 'No'}">${note.done ? 'Yes' : 'No'}</span>`;
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function() {
                window.location.href = `notes_detail.html?id=${note._id}`;
            };
            listItem.appendChild(editButton);
            noteList.appendChild(listItem);
        });
    }
}

// sort functions
document.getElementById('sortByName').onclick = function() {
    sortNotesByName();
}

document.getElementById('sortByDate').onclick = function() {
    sortNotesByDate();
}

document.getElementById('sortByDone').onclick = function() {
    sortNotesByDone();
}

function sortNotesByName() {
    getNotesFromBackend()
        .then(notes => {
            notes.sort(function(a, b) {
                return a.note.localeCompare(b.note);
            });
            displayNoteList(notes);
        });
}

function sortNotesByDate() {
    getNotesFromBackend()
        .then(notes => {
            notes.sort(function(a, b) {
                return new Date(a.due_date) - new Date(b.due_date);
            });
            displayNoteList(notes);
        });
}

function sortNotesByDone() {
    getNotesFromBackend()
        .then(notes => {
            notes.sort((a, b) => a.done - b.done);
            displayNoteList(notes);
        });
}
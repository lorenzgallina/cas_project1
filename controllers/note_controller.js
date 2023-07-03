import { getNotesFromBackend } from '../services/services.js';
import { getTheme } from '../services/Localstore_service.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = getTheme();
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
    }
    
    getNotesFromBackend().then(notes => {
        displayNoteList(notes);
    });
});



// Function to display the notes list
function displayNoteList(notes) {
    let noteList = document.getElementById('noteList');
    if (noteList) {
        noteList.innerHTML = '';
        notes.forEach(function(note) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `
            <div class="header">
                <div>
                    <span class="label">Titel:</span>
                    <span class="value">${note.note}</span>
                </div>
                <div class="doneStatus">
                    <span class="label done-status" data-done="${note.done ? 'Yes' : 'No'}">Done: ${note.done ? 'Yes' : 'No'}</span>
                </div>
            </div> 
            <span class="label">Beschreibung:</span> 
            <span class="value">${note.note_description}</span> 
            <span class="label">Deadline:</span> 
            <span class="value">${note.due_date}</span>`;
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.dataset.noteId = note._id;
            
            listItem.appendChild(editButton);
            noteList.appendChild(listItem);
        });
        noteList.addEventListener('click', function(event) {
            if(event.target.tagName === 'BUTTON') {
                let id = event.target.dataset.noteId;
        
                if (event.target.textContent === 'Edit') {
                    window.location.href = `notes_detail.html?id=${id}`; 
                }
            }
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

// filter function
document.getElementById('filterByNotDone').onclick = function() {
    filterNotesByNotDone();
}

function filterNotesByNotDone() {
    getNotesFromBackend()
        .then(notes => {
            let filteredNotes = notes.filter(note => !note.done);
            displayNoteList(filteredNotes);
        });
}
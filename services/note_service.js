// Function to update notes in localStorage
function updateLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to get notes from localStorage
function getNotesFromLocalStorage() {
    let notes = localStorage.getItem('notes');
    if (notes) {
        return JSON.parse(notes);
    } else {
        return [];
    }
}

// Function to display the notes list
function displayNoteList() {
    let notes = getNotesFromLocalStorage();
    let noteList = document.getElementById('noteList');
    if (noteList) {
        notes.forEach(function(note) {
            let listItem = document.createElement('li');
            listItem.textContent = note.note;
            noteList.appendChild(listItem);
        });
    }
}

// Function to handle the note form submission
function handleNoteFormSubmission(event) {
    event.preventDefault();
    let noteForm = document.getElementById('noteForm');
    if (noteForm) {
        let note = noteForm.note.value;
        let notes = getNotesFromLocalStorage();
        notes.push({note: note});
        updateLocalStorage(notes);
        window.location.href = 'index.html';
    }
}

window.onload = function() {
    displayNoteList();
    let noteForm = document.getElementById('noteForm');
    if (noteForm) {
        noteForm.onsubmit = handleNoteFormSubmission;
    }
};
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
            listItem.innerHTML = `Titel: ${note.note} <br/> Beschreibung: ${note.note_description} <br/> Deadline: ${note.due_date}`;
            // listItem.textContent = note.note;
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
        let note_description = noteForm.note_description.value;
        let due_date = noteForm.due_date.value;
        let notes = getNotesFromLocalStorage();
        notes.push({note: note, note_description: note_description, due_date: due_date});
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
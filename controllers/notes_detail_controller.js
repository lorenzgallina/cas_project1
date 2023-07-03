import { getTheme } from '../services/Localstore_service.js';
import { geNotebyIDfromBackend, createNoteBackend, editNoteBackend } from '../services/services.js';

// noteId if existing note otherwise null
let editingNoteId = null;

// Function for adding/ updating note
function handleNoteFormSubmission(event) {
    event.preventDefault();
    let noteForm = document.getElementById('noteForm');
    if (noteForm) {
        let note = noteForm.note.value;
        let note_description = noteForm.note_description.value;
        let due_date = noteForm.due_date.value;
        let done = noteForm.done.checked;

        if (editingNoteId) {
            // If editingNoteId is set, updating an existing todo (PUT)
            editNoteBackend(editingNoteId, note, note_description, due_date, done).then(() => {
                window.location.href = 'index.html';  // Redirect to overview
            });
        } else {
            // If editingNoteId is null, creating a new note (POST)
            createNoteBackend(note, note_description, due_date, done).then(() => {
                window.location.href = 'index.html';  // Redirect to overview
            });
        }
    }
}

window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    editingNoteId = params.get('id'); // Get the note ID from the URL parameter

    const savedTheme = getTheme();
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
    }

    if (editingNoteId) {
        // If editingNoteId is set, fetch note details from the backend and fill the form
        geNotebyIDfromBackend(editingNoteId)
        .then(response => response.json())
        .then(note => {
            document.getElementById('note').value = note.note;
            document.getElementById('note_description').value = note.note_description;
            document.getElementById('due_date').value = note.due_date;
            document.getElementById('done').checked = note.done;
            document.getElementById('noteSubmitButton').value = 'Notiz updaten';
        });
    }

    let noteForm = document.getElementById('noteForm');
    if (noteForm) {
        noteForm.onsubmit = handleNoteFormSubmission;
    }
};
// Get form elements
let noteForm = document.getElementById('noteForm');
let noteInput = document.getElementById('note');
let noteDescriptionInput = document.getElementById('note_description');
let dueDateInput = document.getElementById('due_date');

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
            fetch(`http://localhost:3000/todos/${editingNoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note: note,
                    note_description: note_description,
                    due_date: due_date,
                    done: done,
                }),
            })
            .then(() => {
                window.location.href = 'index.html';  // Redirect to overview
            });
        } else {
            // If editingNoteId is null, creating a new note (POST)
            fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note: note,
                    note_description: note_description,
                    due_date: due_date,
                    done: done,
                }),
            })
            .then(() => {
                window.location.href = 'index.html';  // Redirect to overview
            });
        }
    }
}

window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    editingNoteId = params.get('id'); // Get the note ID from the URL parameter

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark-theme");
    }

    if (editingNoteId) {
        // If editingNoteId is set, fetch note details from the backend and fill the form
        fetch(`http://localhost:3000/todos/${editingNoteId}`)
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
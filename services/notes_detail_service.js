// Get form elements
let noteForm = document.getElementById('noteForm');
let noteInput = document.getElementById('note');
let noteDescriptionInput = document.getElementById('note_description');
let dueDateInput = document.getElementById('due_date');

// Function to handle the note form submission
function handleNoteFormSubmission(event) {
    event.preventDefault();
    if (noteForm) {
        let note = noteInput.value;
        let note_description = noteDescriptionInput.value;
        let due_date = dueDateInput.value;
        
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note: note,
                note_description: note_description,
                due_date: due_date,
            }),
        })
        .then(() => {
            window.location.href = 'index.html';  // Redirect back to the notes page
        })
        .catch(error => {
            console.error('Error:', error);
            console.log("error occured");
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (noteForm) {
        noteForm.onsubmit = handleNoteFormSubmission;
    }
});
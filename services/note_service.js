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
function displayNoteList() {
    getNotesFromBackend()
        .then(notes => {
            let noteList = document.getElementById('noteList');
            if (noteList) {
                notes.forEach(function(note) {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = `Titel: ${note.note} <br/> Beschreibung: ${note.note_description} <br/> Deadline: ${note.due_date}`;
                    noteList.appendChild(listItem);
                });
            }
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    displayNoteList();
});
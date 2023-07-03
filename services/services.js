// Function to fetch notes from the backend server
export function getNotesFromBackend() {
    return fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(notes => {
            return notes;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function geNotebyIDfromBackend(id) {
    return fetch(`http://localhost:3000/todos/${id}`)
}

export function createNoteBackend(note, note_description, due_date, done) {
    return fetch('http://localhost:3000/todos', {
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
}

export function editNoteBackend(Id, note, note_description, due_date, done) {
    return fetch(`http://localhost:3000/todos/${Id}`, {
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
}
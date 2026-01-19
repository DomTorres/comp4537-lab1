/**
 * ChatGPT was used to help write this code.
 * I used it to create starter code, and how to structure the classes.
 */

class NoteView {
    constructor(note, onChange, onRemove) {
        this.note = note;

        this.container = document.createElement('div');

        this.textArea = document.createElement('textarea');
        this.textArea.value = this.note.text;

        this.removeButton = document.createElement('button');
        this.removeButton.textContent = BTN_REMOVE;

        this.container.appendChild(this.textArea);
        this.container.appendChild(this.removeButton);

        this.textArea.addEventListener('input', e => {
            onChange(this.note.id, e.target.value);
        });

        this.removeButton.addEventListener('click', e => {
            onRemove(this.note.id);
        });
    }
}

/**
 * Controller logic
 */
let notes = NotesStore.load();

const container = document.getElementById('notes');

const addButton = document.getElementById('add');
addButton.textContent = BTN_ADD;

const backButton = document.getElementById('back');
backButton.textContent = BTN_BACK;

const storedAt = document.getElementById('stored-at');
storedAt.textContent = MSG_STORED_AT;

function render() {
    container.innerHTML = '';

    notes.forEach(note => {
        const noteView = new NoteView(note, updateNote, removeNote);
        container.appendChild(noteView.container);
    });
}

function updateNote(id, newText) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.text = newText;
    }
}

function removeNote(id) {
    notes = notes.filter(n => n.id !== id);
    NotesStore.save(notes);
    render();
}

addButton.addEventListener('click', () => {
    const note = new Note('');
    notes.push(note);
    render();
});


render();


/**
 * Save to localStorage every 2 seconds
 */
setInterval(() => {
    NotesStore.save(notes);
    storedAt.textContent = `${MSG_STORED_AT} ${new Date().toLocaleTimeString()}`;
}, 2000);
/**
 * ChatGPT was used to help write this code.
 * I used it to create starter code, and how to structure the classes.
 */

class NoteView {
    constructor(note) {
        this.note = note;

        this.container = document.createElement('div');

        this.textArea = document.createElement('textarea');
        this.textArea.value = this.note.text;
        this.textArea.readOnly = true;

        this.container.appendChild(this.textArea);
    }
}

/**
 * Controller logic
 */
let notes = NotesStore.load();

const container = document.getElementById('notes');

const backButton = document.getElementById('back');
backButton.textContent = BTN_BACK;

const updatedAt = document.getElementById('updated-at');
updatedAt.textContent = MSG_UPDATED_AT;

function render() {
    container.innerHTML = '';

    notes.forEach(note => {
        const noteView = new NoteView(note);
        container.appendChild(noteView.container);
    });
}

render();


/**
 * Save to localStorage every 2 seconds
 */
setInterval(() => {
    notes = NotesStore.load(notes);
    render();
    updatedAt.textContent = `${MSG_UPDATED_AT} ${new Date().toLocaleTimeString()}`;
}, 2000);   
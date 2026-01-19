const STORAGE_KEY = 'notes';

class NotesStore {
    static load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    static save(notes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
}``
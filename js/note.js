class Note {
    constructor(text) {
        this.text = text;
        this.id = crypto.randomUUID();
    }
}
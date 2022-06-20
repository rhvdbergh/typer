export class Stats {
    constructor(levelWords) {
        this.score = 0;
        this.level = 4;
        this.lives = 2;
        this.register = '';
        this.userWord = '';
        this.levelWords = [...levelWords];
        this.visibleWords = new Array();
        this.currentWords = null;
    }
}

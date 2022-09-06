export class Stats {
    constructor(levelInfo) {
        this.score = 0;
        this.level = 1;
        this.lives = 2;
        this.register = '';
        this.userWord = '';
        this.learningLevel = levelInfo.learningLevel;
        this.levelWords = [...levelInfo.levelWords];
        this.visibleWords = new Array();
        this.currentWords = null;
        this.keymap = {};
        this.singleKeymap = {};
        this.translatedKey = '';
        this.highScore = 0;
    }
}
Stats.startingLevel = 1; // also set in the constructor below

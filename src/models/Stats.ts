export class Stats {
    score: number;
    level: number;
    lives: number;
    register: string;
    userWord: string;
    levelWords: string[];
    currentWords: string[] | null;
    visibleWords: string[];

    static startingLevel = 6; // also set in the constructor below

    constructor(levelWords: string[]) {
        this.score = 0;
        this.level = 6;
        this.lives = 2;
        this.register = '';
        this.userWord = '';
        this.levelWords = [...levelWords];
        this.visibleWords = new Array<string>();
        this.currentWords = null;
    }
}

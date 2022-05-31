export class Stats {
    score: number;
    level: number;
    lives: number;
    register: string;
    userWord: string;
    levelWords: string[];
    currentWords: string[] | null;
    visibleWords: string[];

    constructor(levelWords: string[]) {
        this.score = 0;
        this.level = 1;
        this.lives = 2;
        this.register = '';
        this.userWord = '';
        this.levelWords = [...levelWords];
        this.visibleWords = new Array<string>();
        this.currentWords = null;
    }
}

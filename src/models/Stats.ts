import {IWord} from "./IWord";

export class Stats {
    score: number;
    level: number;
    register: string;
    userWord: string;
    levelWords: IWord[];
    currentWords: string[] | null;
    visibleWords: IWord[];

    constructor(levelWords: IWord[]) {
        this.score = 0;
        this.level = 1;
        this.register = '';
        this.userWord = '';
        this.levelWords = levelWords;
        this.visibleWords = new Array<IWord>();
        this.currentWords = null;
    }
}

import {ILevelInfo} from "./ILevelInfo";

export class Stats {
    score: number;
    level: number;
    lives: number;
    register: string;
    userWord: string;
    learningLevel: boolean;
    levelWords: string[];
    currentWords: string[] | null;
    visibleWords: string[];
    keymap: object;
    singleKeymap: object;
    translatedKey: string;

    static startingLevel = 1; // also set in the constructor below

    constructor(levelInfo: ILevelInfo) {
        this.score = 0;
        this.level = 1;
        this.lives = 2;
        this.register = '';
        this.userWord = '';
        this.learningLevel = levelInfo.learningLevel;
        this.levelWords = [...levelInfo.levelWords];
        this.visibleWords = new Array<string>();
        this.currentWords = null;
        this.keymap = {};
        this.singleKeymap = {};
        this.translatedKey = '';
    }
}

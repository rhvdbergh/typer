import {IWord} from "./IWord";

export interface IStats {
    score: number;
    level: number;
    register: string;
    userWord: string;
    currentWord: string | null;
    visibleWords: IWord[];
}

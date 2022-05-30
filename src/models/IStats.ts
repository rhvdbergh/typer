import {IWord} from "./IWord";

export interface IStats {
    score: number;
    level: number;
    register: string;
    userWord: string;
    currentWords: string[] | null;
    visibleWords: IWord[];
}

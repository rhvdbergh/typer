export interface IStats {
    score: number;
    level: number;
    lives: number;
    register: string;
    userWord: string;
    currentWords: string[] | null;
    visibleWords: string[];
    paused: boolean;
}

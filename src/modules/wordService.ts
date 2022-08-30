import {ILevelInfo} from "../models/ILevelInfo";

class WordService {

    async getLevelInfo(level: number): Promise<ILevelInfo> {
        const response = await fetch(`/words/level/${level}`);
        const info: ILevelInfo = await response.json();
        return info;
    }

    async getKeymap() {
        const response = await fetch(`/words/keymap`);
        const keymap = await response.json();
        return keymap;
    }

    pickRandomWordFrom(words: string[]) {
        return words[Math.floor(Math.random() * words.length)];
    }

    removeFromWords(word: string, levelWords: string[], visibleWords: string[]): void {
        let index = levelWords.indexOf(word);
        levelWords.splice(index, 1);
        index = visibleWords.indexOf(word);
        visibleWords.splice(index, 1);
    }
}

export default new WordService();
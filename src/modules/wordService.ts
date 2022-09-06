import {ILevelInfo} from "../models/ILevelInfo";
import {getKeymap, getLevel} from "./wordRepo";

class WordService {

    async getLevelInfo(level: number): Promise<ILevelInfo> {
        const info = await getLevel(level);
        return info;
    }

    async getKeymap() {
        const keymap = await getKeymap();
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
import {IWord} from "../models/IWord";

class WordService {

    async getLevelWords(level: number): Promise<IWord[]> {
        const response = await fetch(`/words/level/${level}`);
        const words: string[] = await response.json();
        return words.map(x => {
            return {word: x, posX: 0, posY: 0}
        });
    }

    async getKeymap() {
        const response = await fetch(`/words/keymap`);
        const keymap = await response.json();
        return keymap;
    }

    pickRandomWordFrom(words: string[]) {
        return words[Math.floor(Math.random() * words.length)];
    }

    removeFromWords(word: string, words: IWord[]) {
        let index = words.map(x => x.word).indexOf(word);
        words.splice(index, 1);
        return words;
    }
}

export const wordService = new WordService();
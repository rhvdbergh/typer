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

    pickRandomWordFrom(words: IWord[]) {
        return words[Math.floor(Math.random() * words.length)];
    }

    removeFromWords(word: string, levelWords: IWord[], visibleWords: IWord[]): void {
        let index = levelWords.map(x => x.word).indexOf(word);
        levelWords.splice(index, 1);
        index = visibleWords.map(x => x.word).indexOf(word);
        visibleWords.splice(index, 1);
    }
}

export default new WordService();
class WordService {

    async getLevelWords(level: number) {
        const response = await fetch(`/words/level/${level}`);
        const words = await response.json();
        return words;
    }

    pickRandomWordFrom(words: string[]) {
        return words[Math.floor(Math.random() * words.length)];
    }

    removeFromWords(word: string, words: string[]) {
        let index = words.indexOf(word);
        words.splice(index, 1);
        return words;
    }
}

export const wordService = new WordService();
import {ILevelInfo} from "../models/ILevelInfo";

const wordList = require('../resources/word_lists/nt_greek_word_list');
const {
    keymaps,
    fullKeymap,
    singleKeymap
} = require('../resources/keymaps/nt_greek_keymap');

export const getLevel = (level: number): ILevelInfo => {
    let learningLevel = false;
    switch (true) {
        // for the first three levels, levels correspond with stages
        case (level <= 3):
            return {learningLevel: true, levelWords: Object.values(keymaps[level - 1])};
            break;
        case (level > 3 && level < 29):
            // for stages 4 to 15, the levels do not correspond with stages
            const stage = Math.ceil(level / 2) + 1;
            if (level % 2 === 0) {
                return {
                    learningLevel: false,
                    levelWords: selectWordsForLevel(stage, Math.abs(stage / 2) + 1, stage < 10 ? 20 : 25)
                };
            } else {
                return {learningLevel: true, levelWords: Object.values(keymaps[stage - 1])};
            }
        case (level > 28):
            return {learningLevel: false, levelWords: selectWordsFromCompleteList(25)};
        default:
            return {learningLevel: false, levelWords: selectWordsFromCompleteList(25)};
    }
}
export const getKeymap = () => {
    return {fullKeymap, singleKeymap};
}

const selectWordsForLevel = (level: number, maxWordLength: number, numWords: number) => {

    let allowedSymbols = [];
    for (let i = 0; i < level; i++) {
        allowedSymbols.push(...Object.values(keymaps[i]));
    }

    const wordPool = wordList.filter((word: string) => word.length <= maxWordLength);
    const selectedWords = [];

    let safetyCounter = 0;
    while (selectedWords.length < numWords || safetyCounter === 1500) {
        let word = wordPool[pickRandomIndex(wordPool.length)];
        let choppedWord = word;

        for (let i = 0; i < allowedSymbols.length - 1; i++) {
            choppedWord = choppedWord.replaceAll(allowedSymbols[i], '');
        }

        if (choppedWord === '') {
            selectedWords.push(word);
        }
        safetyCounter++;
    }

    if (safetyCounter === 1500) { // couldn't find enough words
        // we're returning the symbol set so nothing breaks and the user has words to type
        return allowedSymbols;
    }

    return selectedWords;
}

const selectWordsFromCompleteList = (numWords: number) => {

    const selectedWords = [];

    while (selectedWords.length < numWords) {
        const newWord = wordList[pickRandomIndex(wordList.length)];
        if (newWord && newWord !== '' && newWord.replace(' ').length > 0)
            selectedWords.push(newWord);
    }

    return selectedWords;

}

const pickRandomIndex = (arrayLength: number) => {
    return Math.floor(Math.random() * arrayLength);
}



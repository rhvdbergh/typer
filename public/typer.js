"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const wordContainer = document.querySelector('#word_container');
        const wordInput = document.querySelector('#word_input');
        const inputTest = document.querySelector('#input_test');
        let score = 0;
        let level = 1;
        let words = yield getLevelWords(level);
        let currentWord = pickRandomWordFrom(words);
        const evaluateKeyPress = (evt) => __awaiter(this, void 0, void 0, function* () {
            console.log(`key pressed: `, evt.key);
            console.log('words', words);
            if (wordInput && (wordInput === null || wordInput === void 0 ? void 0 : wordInput.value) === currentWord) {
                // we have a match!
                score++;
                words = removeFromWords(currentWord, words);
                if (words.length === 0) {
                    level++;
                    words = yield getLevelWords(level);
                }
                currentWord = pickRandomWordFrom(words);
                if (wordContainer)
                    wordContainer.innerText = currentWord;
                wordInput.value = '';
            }
            else if (wordInput && currentWord.substring(0, wordInput.value.length) !== wordInput.value) {
                wordInput.value = '';
            }
            if (inputTest && (wordInput === null || wordInput === void 0 ? void 0 : wordInput.value))
                inputTest.innerText = wordInput === null || wordInput === void 0 ? void 0 : wordInput.value;
            console.log(`word input is`, wordInput === null || wordInput === void 0 ? void 0 : wordInput.value);
            wordInput === null || wordInput === void 0 ? void 0 : wordInput.focus();
        });
        window.addEventListener("keyup", evaluateKeyPress);
        window.addEventListener("keydown", e => {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        });
        window.addEventListener("click", () => wordInput === null || wordInput === void 0 ? void 0 : wordInput.focus());
        if (wordContainer)
            wordContainer.innerText = currentWord;
    });
}
;
main();
function getLevelWords(level) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/words/level/${level}`);
        const words = yield response.json();
        return words;
    });
}
const pickRandomWordFrom = (words) => {
    return words[Math.floor(Math.random() * words.length)];
};
const removeFromWords = (word, words) => {
    let index = words.indexOf(word);
    words.splice(index, 1);
    return words;
};

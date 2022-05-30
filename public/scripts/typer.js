var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wordService } from "./modules/wordService.js";
import { feedbackService } from "./modules/feedbackService.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let score = 0;
        let level = 1;
        let register = '';
        let userWord = '';
        let levelWords = yield wordService.getLevelWords(level);
        let currentWord = null;
        let visibleWords = new Array();
        // visibleWords.push(wordService.pickRandomWordFrom(levelWords));
        const keymap = yield wordService.getKeymap();
        feedbackService.updateFeedback({
            level,
            currentWord,
            register,
            score,
            userWord,
            visibleWords
        });
        const evaluateKeyPress = (evt) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // for now, we add a visible word each time, manually, on each keypress
            let newWordAdded = false;
            while (!newWordAdded && visibleWords.length !== levelWords.length) {
                let newWord = wordService.pickRandomWordFrom(levelWords);
                if (!visibleWords.some(x => x.word === newWord.word)) {
                    visibleWords.push(newWord);
                    newWordAdded = true;
                }
            }
            register += evt.key;
            if (Object.keys(keymap).includes(register) && register.length <= 2) {
                userWord += keymap[register];
                register = '';
            }
            else if (register.length >= 2) {
                register = '';
            }
            if (currentWord === null) {
                const word = (_a = visibleWords.find(x => x.word[0] === userWord)) === null || _a === void 0 ? void 0 : _a.word;
                if (word !== undefined) {
                    currentWord = word;
                }
                else {
                    userWord = '';
                }
            }
            if (userWord === currentWord) {
                // we have a match!
                score++;
                wordService.removeFromWords(currentWord, levelWords, visibleWords);
                if (levelWords.length === 0) {
                    level++;
                    levelWords = yield wordService.getLevelWords(level);
                }
                userWord = '';
                currentWord = null;
            }
            else if (currentWord && currentWord.substring(0, userWord.length) !== userWord) {
                userWord = '';
                currentWord = null;
            }
            feedbackService.updateFeedback({
                level,
                currentWord,
                register,
                score,
                userWord,
                visibleWords
            });
        });
        window.addEventListener("keyup", evaluateKeyPress);
        window.addEventListener("keydown", e => {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        });
    });
}
;
main();

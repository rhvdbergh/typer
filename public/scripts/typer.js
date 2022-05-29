var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { wordContainer, inputTest } from "./modules/setup.js";
import { wordService } from "./modules/wordService.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let score = 0;
        let level = 1;
        let register = '';
        let userWord = '';
        let levelWords = yield wordService.getLevelWords(level);
        let currentWord = wordService.pickRandomWordFrom(levelWords);
        const keymap = yield wordService.getKeymap();
        const evaluateKeyPress = (evt) => __awaiter(this, void 0, void 0, function* () {
            console.log(`key pressed: `, evt.key);
            console.log('words', levelWords);
            console.log('userWord before evaluation', userWord);
            console.log('level is', level);
            register += evt.key;
            if (Object.keys(keymap).includes(register) && register.length <= 2) {
                userWord += keymap[register];
                register = '';
            }
            else if (register.length >= 2) {
                register = '';
            }
            console.log('register is', register);
            if (userWord === currentWord) {
                // we have a match!
                score++;
                levelWords = wordService.removeFromWords(currentWord, levelWords);
                if (levelWords.length === 0) {
                    level++;
                    levelWords = yield wordService.getLevelWords(level);
                }
                currentWord = wordService.pickRandomWordFrom(levelWords);
                if (wordContainer)
                    wordContainer.innerText = currentWord;
                userWord = '';
            }
            else if (currentWord.substring(0, userWord.length) !== userWord) {
                userWord = '';
            }
            if (inputTest)
                inputTest.innerText = register;
            console.log('userWord after evaluation', userWord);
        });
        window.addEventListener("keyup", evaluateKeyPress);
        window.addEventListener("keydown", e => {
            if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        });
        if (wordContainer)
            wordContainer.innerText = currentWord;
    });
}
;
main();

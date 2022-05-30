import {wordContainer} from "./modules/setup.js";
import {wordService} from "./modules/wordService.js";
import {feedbackService} from "./modules/feedbackService.js";
import {IWord} from "./models/IWord";

async function main() {
    let score = 0;
    let level = 1;
    let register = '';
    let userWord = '';
    let levelWords: IWord[] = await wordService.getLevelWords(level);
    let currentWord = wordService.pickRandomWordFrom(levelWords.map(x => x.word));
    const keymap = await wordService.getKeymap();

    const evaluateKeyPress = async (evt: KeyboardEvent) => {

        register += evt.key;
        if (Object.keys(keymap).includes(register) && register.length <= 2) {

            userWord += keymap[register];
            register = '';
        } else if (register.length >= 2) {
            register = '';
        }

        if (userWord === currentWord) {
            // we have a match!
            score++;
            levelWords = wordService.removeFromWords(currentWord, levelWords);
            if (levelWords.length === 0) {
                level++;
                levelWords = await wordService.getLevelWords(level);
            }
            currentWord = wordService.pickRandomWordFrom(levelWords.map(x => x.word));
            if (wordContainer) wordContainer.innerText = currentWord;
            userWord = '';
        } else if (currentWord.substring(0, userWord.length) !== userWord) {
            userWord = '';
        }

        feedbackService.updateFeedback({
            level,
            currentWord,
            register,
            score,
            userWord
        })
    }

    window.addEventListener("keyup", evaluateKeyPress);
    window.addEventListener("keydown", e => {

        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    })

    if (wordContainer) wordContainer.innerText = currentWord;
};

main();


import {wordContainer, inputTest} from "./modules/setup.js";
import {wordService} from "./modules/wordService.js";

async function main() {
    let score = 0;
    let level = 1;
    let register = '';
    let userWord = '';
    let levelWords = await wordService.getLevelWords(level);
    let currentWord = wordService.pickRandomWordFrom(levelWords);
    const keymap = await wordService.getKeymap();

    const evaluateKeyPress = async (evt: KeyboardEvent) => {
        console.log(`key pressed: `, evt.key)
        console.log('words', levelWords);
        console.log('userWord before evaluation', userWord);
        console.log('level before evaluation is', level);

        register += evt.key;
        if (Object.keys(keymap).includes(register) && register.length <= 2) {

            userWord += keymap[register];
            register = '';
        } else if (register.length >= 2) {
            register = '';
        }
        console.log('register is', register);

        if (userWord === currentWord) {
            // we have a match!
            score++;
            levelWords = wordService.removeFromWords(currentWord, levelWords);
            if (levelWords.length === 0) {
                level++;
                levelWords = await wordService.getLevelWords(level);
            }
            currentWord = wordService.pickRandomWordFrom(levelWords);
            if (wordContainer) wordContainer.innerText = currentWord;
            userWord = '';
        } else if (currentWord.substring(0, userWord.length) !== userWord) {
            userWord = '';
        }

        if (inputTest) inputTest.innerText = register;

        console.log('userWord after evaluation', userWord);
        console.log('level after evaluation', level)

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


import {wordInput, wordContainer, inputTest} from "./modules/setup.js";
import {wordService} from "./modules/wordService.js";

async function main() {
    let score = 0;
    let level = 1;
    let levelWords = await wordService.getLevelWords(level);
    let currentWord = wordService.pickRandomWordFrom(levelWords);

    const evaluateKeyPress = async (evt: KeyboardEvent) => {
        console.log(`key pressed: `, evt.key)
        console.log('words', levelWords);
        if (wordInput && wordInput?.value === currentWord) {
            // we have a match!
            score++;
            levelWords = wordService.removeFromWords(currentWord, levelWords);
            if (levelWords.length === 0) {
                level++;
                levelWords = await wordService.getLevelWords(level);
            }
            currentWord = wordService.pickRandomWordFrom(levelWords);
            if (wordContainer) wordContainer.innerText = currentWord;
            wordInput.value = '';
        } else if (wordInput && currentWord.substring(0, wordInput.value.length) !== wordInput.value) {
            wordInput.value = '';
        }


        if (inputTest && wordInput?.value) inputTest.innerText = wordInput?.value;

        console.log(`word input is`, wordInput?.value);
        wordInput?.focus();
    }

    window.addEventListener("keyup", evaluateKeyPress);
    window.addEventListener("keydown", e => {

        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    })
    window.addEventListener("click", () => wordInput?.focus());

    if (wordContainer) wordContainer.innerText = currentWord;
};

main();


import {wordService} from "./modules/wordService.js";
import {feedbackService} from "./modules/feedbackService.js";
import {IWord} from "./models/IWord";

async function main() {
    let score = 0;
    let level = 1;
    let register: string = '';
    let userWord: string = '';
    let levelWords: IWord[] = await wordService.getLevelWords(level);
    let currentWord: string | null = null;
    let visibleWords = new Array<IWord>();
    // visibleWords.push(wordService.pickRandomWordFrom(levelWords));
    const keymap = await wordService.getKeymap();
    feedbackService.updateFeedback({
        level,
        currentWord,
        register,
        score,
        userWord,
        visibleWords
    })

    const evaluateKeyPress = async (evt: KeyboardEvent) => {

        // for now, we add a visible word each time, manually, on each keypress
        let newWordAdded = false;
        while (!newWordAdded && visibleWords.length !== levelWords.length) {
            let newWord = wordService.pickRandomWordFrom(levelWords)

            if (!visibleWords.some(x => x.word === newWord.word)) {
                visibleWords.push(newWord);
                newWordAdded = true;
            }
        }

        register += evt.key;
        if (Object.keys(keymap).includes(register) && register.length <= 2) {
            userWord += keymap[register];
            register = '';
        } else if (register.length >= 2) {
            register = '';
        }

        if (currentWord === null) {
            const word = visibleWords.find(x => x.word[0] === userWord)?.word;
            if (word !== undefined) {
                currentWord = word;
            } else {
                userWord = '';
            }
        }

        if (userWord === currentWord) {
            // we have a match!
            score++;
            wordService.removeFromWords(currentWord, levelWords, visibleWords);
            if (levelWords.length === 0) {
                level++;
                levelWords = await wordService.getLevelWords(level);
            }
            userWord = '';
            currentWord = null;
        } else if (currentWord && currentWord.substring(0, userWord.length) !== userWord) {
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
        })

    }

    window.addEventListener("keyup", evaluateKeyPress);
    window.addEventListener("keydown", e => {

        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    })
};

main();


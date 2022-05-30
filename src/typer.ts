import wordService from "./modules/wordService";
import feedbackService from "./modules/feedbackService";
import {Stats} from "./models/Stats";
import {setupView} from "./modules/viewService";

async function main() {
    let stats = new Stats(await wordService.getLevelWords(1))
    const keymap = await wordService.getKeymap();
    stats.visibleWords.push(wordService.pickRandomWordFrom(stats.levelWords));
    console.log(stats);
    setupView(stats);

    feedbackService.updateFeedback({
        level: stats.level,
        currentWords: stats.currentWords,
        register: stats.register,
        score: stats.score,
        userWord: stats.userWord,
        visibleWords: stats.visibleWords
    })

    const evaluateKeyPress = async (evt: KeyboardEvent) => {

        // for now, we add a visible word each time, manually, on each keypress
        let newWordAdded = false;
        while (!newWordAdded && stats.visibleWords.length !== stats.levelWords.length) {
            let newWord = wordService.pickRandomWordFrom(stats.levelWords)

            if (!stats.visibleWords.some(x => x.word === newWord.word)) {
                stats.visibleWords.push(newWord);
                newWordAdded = true;
            }
        }

        stats.register += evt.key;
        if (Object.keys(keymap).includes(stats.register) && stats.register.length <= 2) {
            stats.userWord += keymap[stats.register];
            stats.register = '';
        } else if (stats.register.length >= 2) {
            stats.register = '';
        }

        if (stats.currentWords === null) {
            const words = stats.visibleWords.filter(x => x.word[0] === stats.userWord).map(x => x.word);
            if (words !== undefined) {
                stats.currentWords = new Array<string>();
                words.forEach(word =>
                    stats.currentWords !== null && stats.currentWords.push(word)
                )
            } else {
                stats.userWord = '';
            }
        }

        if (stats.currentWords && stats.currentWords.includes(stats.userWord)) {
            let index = stats.currentWords.findIndex(x => x === stats.userWord);
            // we have a match!
            stats.score++;
            wordService.removeFromWords(stats.currentWords[index], stats.levelWords, stats.visibleWords);
            if (stats.levelWords.length === 0) {
                stats.level++;
                stats.levelWords = await wordService.getLevelWords(stats.level);
            }
            stats.userWord = '';
            stats.currentWords = null;
        } else if (stats.currentWords && !stats.currentWords.find(x => x.includes(stats.userWord))) {
            stats.userWord = '';
            stats.currentWords = null;
        }

        feedbackService.updateFeedback({
            level: stats.level,
            currentWords: stats.currentWords,
            register: stats.register,
            score: stats.score,
            userWord: stats.userWord,
            visibleWords: stats.visibleWords
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

function view() {
}



import wordService from "./modules/wordService";
import {Stats} from "./models/Stats";
import {setupView} from "./modules/viewService";

async function main() {
    const keymap = await wordService.getKeymap();
    let stats = new Stats(await wordService.getLevelWords(Stats.startingLevel));
    stats.keymap = keymap;
    stats.visibleWords.push(wordService.pickRandomWordFrom(stats.levelWords));
    await setupView(stats, true);

    const evaluateKeyPress = async (evt: KeyboardEvent) => {

        stats.register += evt.key;
        if (Object.keys(keymap).includes(stats.register) && stats.register.length <= 2) {
            stats.userWord += keymap[stats.register];
            stats.register = '';
        } else if (stats.register.length >= 2) {
            stats.register = '';
        }

        if (stats.currentWords === null || stats.currentWords.length > 1) {
            const words = stats.visibleWords.filter(x => x.substring(0, stats.userWord.length) === stats.userWord);
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
            stats.score += stats.userWord.length;
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
    }

    window.addEventListener("keyup", evaluateKeyPress);
    window.addEventListener("keydown", e => {

        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    })
};

main();



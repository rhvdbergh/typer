var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import wordService from "./modules/wordService";
import { Stats } from "./models/Stats";
import { setupView } from "./modules/viewService";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const keymap = yield wordService.getKeymap();
        let stats = new Stats(yield wordService.getLevelInfo(Stats.startingLevel));
        stats.keymap = keymap;
        stats.visibleWords.push(wordService.pickRandomWordFrom(stats.levelWords));
        yield setupView(stats, false);
        const evaluateKeyPress = (evt) => __awaiter(this, void 0, void 0, function* () {
            stats.register += evt.key;
            if (Object.keys(keymap).includes(stats.register) && stats.register.length <= 2) {
                stats.userWord += keymap[stats.register];
                stats.register = '';
            }
            else if (stats.register.length >= 2) {
                stats.register = '';
            }
            if (stats.currentWords === null || stats.currentWords.length > 1) {
                const words = stats.visibleWords.filter(x => x.substring(0, stats.userWord.length) === stats.userWord);
                if (words !== undefined) {
                    stats.currentWords = new Array();
                    words.forEach(word => stats.currentWords !== null && stats.currentWords.push(word));
                }
                else {
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
                    const levelInfo = yield wordService.getLevelInfo(stats.level);
                    stats.levelWords = levelInfo.levelWords;
                    stats.learningLevel = levelInfo.learningLevel;
                }
                stats.userWord = '';
                stats.currentWords = null;
            }
            else if (stats.currentWords && !stats.currentWords.find(x => x.includes(stats.userWord))) {
                stats.userWord = '';
                stats.currentWords = null;
            }
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getKeymap, getLevel } from "./wordRepo";
class WordService {
    getLevelInfo(level) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield getLevel(level);
            return info;
        });
    }
    getKeymap() {
        return __awaiter(this, void 0, void 0, function* () {
            const keymap = yield getKeymap();
            return keymap;
        });
    }
    pickRandomWordFrom(words) {
        return words[Math.floor(Math.random() * words.length)];
    }
    removeFromWords(word, levelWords, visibleWords) {
        let index = levelWords.indexOf(word);
        levelWords.splice(index, 1);
        index = visibleWords.indexOf(word);
        visibleWords.splice(index, 1);
    }
}
export default new WordService();

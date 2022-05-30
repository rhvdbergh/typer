import wordService from "./modules/wordService";
import feedbackService from "./modules/feedbackService";
import {IWord} from "./models/IWord";

async function main() {
    let score = 0;
    let level = 1;
    let register: string = '';
    let userWord: string = '';
    let levelWords: IWord[] = await wordService.getLevelWords(level);
    let currentWords: string[] | null = null;
    let visibleWords = new Array<IWord>();
    // visibleWords.push(wordService.pickRandomWordFrom(levelWords));
    const keymap = await wordService.getKeymap();
    feedbackService.updateFeedback({
        level,
        currentWords: currentWords,
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

        if (currentWords === null) {
            const words = visibleWords.filter(x => x.word[0] === userWord).map(x => x.word);
            if (words !== undefined) {
                currentWords = new Array<string>();
                words.forEach(word =>
                    currentWords !== null && currentWords.push(word)
                )
            } else {
                userWord = '';
            }
        }

        if (currentWords && currentWords.includes(userWord)) {
            let index = currentWords.findIndex(x => x === userWord);
            // we have a match!
            score++;
            wordService.removeFromWords(currentWords[index], levelWords, visibleWords);
            if (levelWords.length === 0) {
                level++;
                levelWords = await wordService.getLevelWords(level);
            }
            userWord = '';
            currentWords = null;
        } else if (currentWords && !currentWords.find(x => x.includes(userWord))) {
            userWord = '';
            currentWords = null;
        }

        feedbackService.updateFeedback({
            level,
            currentWords: currentWords,
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

import * as PIXI from 'pixi.js';

const pixi = new PIXI.Application({width: 600, height: 600});
document.body.appendChild(pixi.view);

let sprite = PIXI.Sprite.from('./resources/sprites/sample.png');
pixi.stage.addChild(sprite);
let elapsed = 0.0;
pixi.ticker.add((delta) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
})

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PIXI from 'pixi.js';
import wordService from "./wordService";
import feedbackService from "./feedbackService";
export function setupView(stats, displayDevStats) {
    return __awaiter(this, void 0, void 0, function* () {
        const pixiHeight = window.innerHeight;
        const pixiWidth = window.innerWidth;
        let level = stats.level;
        let score = stats.score;
        let lives = stats.lives;
        let userWord = stats.userWord;
        // set up the pixi app
        const pixi = new PIXI.Application({ width: pixiWidth, height: pixiHeight, backgroundColor: 0x555555 });
        document.body.appendChild(pixi.view);
        let shipContainers = new Array();
        // set up the first word's shipContainer
        let word = stats.visibleWords[0];
        shipContainers.push(initShipContainer(word, stats));
        // set up the level, score, and lives text
        let scoreDisplay = new PIXI.Text(`Score: ${String(score)}`, {
            fontSize: 24,
            dropShadowColor: 'blue',
            fill: ['#fff', '#aaa']
        });
        scoreDisplay.x = pixiWidth - 150;
        scoreDisplay.y = 10;
        let levelDisplay = new PIXI.Text(`Level: ${String(level)}`, {
            fontSize: 24,
            dropShadowColor: 'blue',
            fill: ['#fff', '#aaa']
        });
        levelDisplay.x = pixiWidth - 300;
        levelDisplay.y = 10;
        let livesDisplay = new PIXI.Text(`Lives: ${String(lives)}`, {
            fontSize: 24,
            dropShadowColor: 'blue',
            fill: ['#fff', '#aaa']
        });
        livesDisplay.x = pixiWidth - 450;
        livesDisplay.y = 10;
        let userWordDisplay = new PIXI.Text(userWord, {
            fontSize: 64,
            dropShadowColor: 'blue',
            fill: ['#fff', '#aaa']
        });
        centerUserWordDisplay();
        let messageDisplay = new PIXI.Text(`LEVEL ${level}!`, {
            fontSize: 100,
            fontWeight: "bolder",
            dropShadowColor: 'yellow',
            fill: ['#fff', '#aaa']
        });
        centerMessageDisplay();
        pixi.stage.addChild(shipContainers[0].shipContainer, livesDisplay, scoreDisplay, levelDisplay, userWordDisplay, messageDisplay);
        setTimeout(() => {
            pixi.stage.removeChild(messageDisplay);
        }, 3000);
        const triggerGet = () => __awaiter(this, void 0, void 0, function* () {
            const levelInfo = yield wordService.getLevelInfo(stats.level);
            stats.levelWords = levelInfo.levelWords;
            stats.learningLevel = levelInfo.learningLevel;
        });
        const ticker = pixi.ticker.add((delta) => {
            // clean up; if a word has been deleted, destroy the pixi object
            let toBeDestroyed = shipContainers.filter(ship => !stats.visibleWords.includes(ship.word));
            if (toBeDestroyed.length > 0) {
                toBeDestroyed.forEach(tbd => {
                    let removeAtIndex = shipContainers.findIndex(ship => ship.word === tbd.word);
                    tbd.shipContainer.destroy();
                    shipContainers.splice(removeAtIndex, 1);
                });
            }
            let furthestShipY = -1;
            if (shipContainers.length > 0)
                furthestShipY = shipContainers[shipContainers.length - 1].shipContainer.y;
            if (furthestShipY > (level < 15 ? (pixiHeight / 2) : (pixiHeight / 2.5)) || furthestShipY === -1) {
                let newWordAdded = false;
                while (!newWordAdded && stats.visibleWords.length !== stats.levelWords.length) {
                    let newWord = wordService.pickRandomWordFrom(stats.levelWords);
                    if (!stats.visibleWords.some(x => x === newWord)) {
                        stats.visibleWords.push(newWord);
                        newWordAdded = true;
                        shipContainers.push(initShipContainer(newWord, stats));
                        pixi.stage.addChild(shipContainers[shipContainers.length - 1].shipContainer);
                    }
                }
            }
            if (shipContainers.length > 0) {
                let removeAtIndex = undefined;
                shipContainers.forEach((ship, index) => {
                    if (ship.shipContainer.y < pixiHeight - ship.shipContainer.height) {
                        // set the ship speed
                        ship.shipContainer.y += delta * (level + 10) / 25;
                    }
                    else {
                        // it has crashed into the ground
                        stats.lives--;
                        removeAtIndex = index;
                        ship.shipContainer.destroy();
                        wordService.removeFromWords(ship.word, stats.levelWords, stats.visibleWords);
                    }
                });
                if (removeAtIndex !== undefined) {
                    shipContainers.splice(removeAtIndex, 1);
                    if (stats.levelWords.length <= 0) {
                        stats.level++;
                        triggerGet();
                    }
                }
            }
            if (stats.lives <= 0) {
                messageDisplay.text = `GAME OVER!`;
                centerMessageDisplay();
                pixi.stage.addChild(messageDisplay);
                pixi.ticker.stop();
                setTimeout(() => {
                    pixi.stage.removeChild(messageDisplay);
                    pixi.ticker.start();
                }, 5000);
            }
            if (level != stats.level) {
                level = stats.level;
                levelDisplay.text = `Level: ${level}`;
                messageDisplay.text = `Level ${level}`;
                centerMessageDisplay();
                pixi.stage.addChild(messageDisplay);
                pixi.ticker.stop();
                setTimeout(() => {
                    pixi.stage.removeChild(messageDisplay);
                    pixi.ticker.start();
                }, 3000);
            }
            if (score != stats.score) {
                score = stats.score;
                scoreDisplay.text = `Score: ${score}`;
            }
            if (lives != stats.lives) {
                lives = stats.lives;
                livesDisplay.text = `Lives: ${lives}`;
            }
            if (userWord != stats.userWord) {
                userWord = stats.userWord;
                userWordDisplay.text = userWord;
                centerUserWordDisplay();
            }
            if (displayDevStats)
                feedbackService.updateFeedback(stats);
        });
        handlePause(ticker);
        function handlePause(ticker) {
            window.addEventListener("keyup", (evt) => {
                if (evt.key === 'Escape' && ticker.started) {
                    pixi.stage.removeChild(messageDisplay);
                    messageDisplay.text = "Paused";
                    centerMessageDisplay();
                    pixi.stage.addChild(messageDisplay);
                    const timeToEnsureMessageDisplaysBeforeStop = 10;
                    setTimeout(() => ticker.stop(), timeToEnsureMessageDisplaysBeforeStop);
                }
                else {
                    pixi.stage.removeChild(messageDisplay);
                    ticker.start();
                }
            });
        }
        function centerMessageDisplay() {
            messageDisplay.x = (pixiWidth / 2) - (messageDisplay.width / 2);
            messageDisplay.y = (pixiHeight / 2) - (messageDisplay.height / 2);
        }
        function centerUserWordDisplay() {
            userWordDisplay.x = (pixiWidth / 2) - (userWordDisplay.width / 2);
            userWordDisplay.y = pixiHeight - userWordDisplay.height - 50;
        }
    });
}
function initShipContainer(initText, stats) {
    showKeymapFor(initText, stats);
    let text = new PIXI.Text(initText, {
        fontSize: 40,
        dropShadowColor: 'blue',
        fill: ['#fff', '#aaa']
    });
    let keymapText = new PIXI.Text(`(${showKeymapFor(initText, stats)})`, {
        fontSize: 20,
        fill: ['#ebd234', '#80ba29']
    });
    keymapText.y = 30;
    keymapText.x = -6;
    let shipContainer = new PIXI.Container();
    shipContainer.addChild(text);
    stats.learningLevel && shipContainer.addChild(keymapText);
    shipContainer.y = 0;
    shipContainer.x = randomX(shipContainer.width);
    return { word: initText, shipContainer };
}
function showKeymapFor(text, stats) {
    let reverseKeymap = Object.fromEntries(Object.entries(stats.keymap).map(x => x.reverse()));
    return text.split('').map(char => reverseKeymap[char]).join('');
}
function randomX(shipWidth) {
    return Math.abs((Math.random() * window.innerWidth) - shipWidth);
}

import * as PIXI from 'pixi.js';
import {Stats} from "../models/Stats";
import wordService from "./wordService";
import feedbackService from "./feedbackService";

interface IShip {
    word: string;
    shipContainer: PIXI.Container;
}

export async function setupView(stats: Stats, displayDevStats: boolean) {
    const pixiHeight = window.innerHeight;
    const pixiWidth = window.innerWidth;

    let level = stats.level;
    let score = stats.score;
    let lives = stats.lives;
    let userWord = stats.userWord;

    // set up the pixi app
    const pixi = new PIXI.Application({width: pixiWidth, height: pixiHeight});
    document.body.appendChild(pixi.view);

    let shipContainers = new Array<IShip>();

    // set up the first word's shipContainer
    let word = stats.visibleWords[0];
    shipContainers.push(initShipContainer(word));

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

    let userWordDisplay = new PIXI.Text(`Building: ${userWord}`, {
        fontSize: 24,
        dropShadowColor: 'blue',
        fill: ['#fff', '#aaa']
    });

    userWordDisplay.x = 10;
    userWordDisplay.y = pixiHeight - userWordDisplay.height - 10;

    let messageDisplay = new PIXI.Text(`LEVEL ${level}!`, {
        fontSize: 100,
        fontWeight: "bolder",
        dropShadowColor: 'yellow',
        fill: ['#fff', '#aaa']
    });

    messageDisplay.x = (pixiWidth / 2) - (messageDisplay.width / 2);
    messageDisplay.y = (pixiHeight / 2) - (messageDisplay.height / 2);

    pixi.stage.addChild(shipContainers[0].shipContainer, livesDisplay, scoreDisplay, levelDisplay, userWordDisplay, messageDisplay);

    setTimeout(() => {
        pixi.stage.removeChild(messageDisplay);
    }, 3000)
    const triggerGet = async () => {
        stats.levelWords = await wordService.getLevelWords(stats.level);
    }

    pixi.ticker.add((delta) => {


        // clean up; if a word has been deleted, destroy the pixi object
        let toBeDestroyed = shipContainers.filter(ship => !stats.visibleWords.includes(ship.word));
        if (toBeDestroyed.length > 0) {
            toBeDestroyed.forEach(tbd => {
                let removeAtIndex = shipContainers.findIndex(ship => ship.word === tbd.word);
                tbd.shipContainer.destroy();
                shipContainers.splice(removeAtIndex, 1);
            })
        }

        let furthestShipY = -1;
        if (shipContainers.length > 0) furthestShipY = shipContainers[shipContainers.length - 1].shipContainer.y;

        if (furthestShipY > pixiHeight / 2 || furthestShipY === -1) {
            let newWordAdded = false;
            while (!newWordAdded && stats.visibleWords.length !== stats.levelWords.length) {
                let newWord = wordService.pickRandomWordFrom(stats.levelWords)

                if (!stats.visibleWords.some(x => x === newWord)) {
                    stats.visibleWords.push(newWord);
                    newWordAdded = true;
                    shipContainers.push(initShipContainer(newWord));
                    pixi.stage.addChild(shipContainers[shipContainers.length - 1].shipContainer);
                }
            }
        }

        if (shipContainers.length > 0) {

            let removeAtIndex: number | undefined = undefined;
            shipContainers.forEach((ship, index) => {
                    if (ship.shipContainer.y < pixiHeight - ship.shipContainer.height) {
                        // set the ship speed
                        ship.shipContainer.y += delta * level / 5;
                        ship.shipContainer.rotation += (0.001 * level) * (Math.random() - Math.random());
                    } else {
                        // it has crashed into the ground
                        stats.lives--;
                        removeAtIndex = index;
                        ship.shipContainer.destroy()
                        wordService.removeFromWords(ship.word, stats.levelWords, stats.visibleWords)
                    }
                }
            );

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
            pixi.stage.addChild(messageDisplay);
            pixi.ticker.stop();
            setTimeout(() => {
                pixi.stage.removeChild(messageDisplay);
                pixi.ticker.start();
            }, 3000)
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
            userWordDisplay.text = `Building: ${userWord}`;
        }

        if (displayDevStats) feedbackService.updateFeedback(stats);
    })
}

function initShipContainer(initText: string): IShip {
    let text = new PIXI.Text(initText, {
        fontSize: 24,
        dropShadowColor: 'blue',
        fill: ['#fff', '#aaa']
    });

    let shipContainer = new PIXI.Container();

    shipContainer.addChild(text);
    shipContainer.y = 0;
    shipContainer.x = randomX(shipContainer.width);

    return {word: initText, shipContainer};
}

function randomX(shipWidth: number) {
    return Math.abs((Math.random() * window.innerWidth) - shipWidth);
}

import * as PIXI from 'pixi.js';
import {Stats} from "../models/Stats";
import wordService from "./wordService";
import feedbackService from "./feedbackService";

interface IShip {
    word: string;
    shipContainer: PIXI.Container;
}

export async function setupView(stats: Stats) {
    const pixiHeight = window.innerHeight;
    const pixiWidth = window.innerWidth;

    // set up the pixi app
    const pixi = new PIXI.Application({width: pixiWidth, height: pixiHeight});
    document.body.appendChild(pixi.view);

    let shipContainers = new Array<IShip>();

    // set up the first word's shipContainer
    let word = stats.visibleWords[0];
    shipContainers.push(initShipContainer(word));

    pixi.stage.addChild(shipContainers[0].shipContainer);
    const triggerGet = async () => {
        stats.levelWords = await wordService.getLevelWords(stats.level);
    }
    let loopCounter = 0;
    pixi.ticker.add((delta) => {

        loopCounter++;

        if (loopCounter > 200) {
            loopCounter = 0;
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
                        ship.shipContainer.y += delta * 4;
                    } else {
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
            console.log('Game Over');
        }

        feedbackService.updateFeedback(stats);
    })
}

function initShipContainer(initText: string): IShip {
    let text = new PIXI.Text(initText, {
        fontSize: 24,
        dropShadowColor: 'blue',
        fill: ['#fff', '#aaa']
    });

    let shipContainer = new PIXI.Container();

    shipContainer.y = 0;
    shipContainer.x = randomX(shipContainer.x);
    shipContainer.addChild(text);

    return {word: initText, shipContainer};
}

function randomX(shipWidth: number) {
    return (Math.random() * window.innerWidth) - shipWidth;
}

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
    pixi.ticker.add((delta) => {
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
                stats.level++;
                triggerGet();
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

    shipContainer.x = text.width;
    shipContainer.y = 0;
    shipContainer.addChild(text);

    return {word: initText, shipContainer};
}

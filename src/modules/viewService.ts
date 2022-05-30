import * as PIXI from 'pixi.js';
import {Stats} from "../models/Stats";

export function setupView(stats: Stats) {
    const pixiHeight = window.innerHeight;
    const pixiWidth = window.innerWidth;

    const pixi = new PIXI.Application({width: pixiWidth, height: pixiHeight});
    document.body.appendChild(pixi.view);

    let shipContainer = new PIXI.Container();

    pixi.stage.addChild(shipContainer);
    let text = new PIXI.Text(stats.visibleWords[0].word, {
        fontSize: 24,
        dropShadowColor: 'blue',
        fill: ['#fff', '#aaa']
    });
    shipContainer.x = text.width;
    shipContainer.y = 0;

    shipContainer.addChild(text);
    let elapsed = 0.0;
    pixi.ticker.add((delta) => {
        if (shipContainer.y < pixiHeight - shipContainer.height) {
            shipContainer.y += delta;
        }
    })
}

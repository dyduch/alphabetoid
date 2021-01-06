
import {Game} from "./modules/game.js";



function main() {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    const game = new Game(canvas, ctx);

    setInterval(game.gameLoop.bind(game), 10);
}

main();

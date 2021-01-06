import {Paddle} from "./modules/paddle.js";
import {Ball} from "./modules/ball.js";
import {checkBallPaddleCollision} from "./modules/paddleCollision.js";
import {BrickBoard} from "./modules/bricks.js";
import {checkBallBricksCollision} from "./modules/bricksCollision.js";

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var paddleX = canvas.width / 2;
var paddleY = canvas.height - 50;

var paddle = new Paddle(paddleX, paddleY, 50, 15, 0, canvas.width);
paddle.addListeners();

var ball = new Ball(paddleX - 20, paddleY - 20, 2, -2, 7, canvas.width, canvas.height);

var level = 1;
var brickBoard = new BrickBoard(14, 14, 50, 20, level);

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return;
    }

    if (event.key === "Enter") {
        brickBoard.bricks = [];
    }

    event.preventDefault();
}, true);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 180, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    paddle.draw(ctx);
    paddle.move();

    ball.draw(ctx);

    brickBoard.draw(ctx);

    checkBallPaddleCollision(ball, paddle);
    checkBallBricksCollision(ball, brickBoard);

    if (!brickBoard.bricks.length) {
        level++;
        ball = new Ball(paddleX - 20, paddleY - 20, 2, -2, 7, canvas.width, canvas.height);
        brickBoard = new BrickBoard(14, 14, 50, 20, level);
    }
}

function main() {
    setInterval(draw, 10);
}

main();

import {Paddle} from "./modules/paddle.js";
import {Ball} from "./modules/ball.js";
import {checkBallPaddleCollision} from "./modules/collision.js";

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var paddleX = canvas.width / 2;
var paddleY = canvas.height - 50;

var paddle = new Paddle(paddleX, paddleY, 50, 15, 0, canvas.width);
paddle.addListeners();

var ball = new Ball(canvas.width / 2, canvas.height / 2, 2, -2, 10, canvas.width, canvas.height);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 180, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    paddle.draw(ctx);
    paddle.move();

    ball.draw(ctx);

    checkBallPaddleCollision(ball, paddle);
}

function main() {
    setInterval(draw, 10);
}

main();

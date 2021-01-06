import {Ball} from "./ball.js";
import {Stats} from "./stats.js";
import {Paddle} from "./paddle.js";
import {BrickBoard} from "./bricks.js";
import {checkBallPaddleCollision} from "./paddleCollision.js";
import {checkBallBricksCollision} from "./bricksCollision.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.balls = this.createBalls(this.canvas);
        this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 50, 50, 15, 0, this.canvas.width);
        this.stats = new Stats(5);
        this.brickBoard = this.createBrickBoard();

        this.addListeners();
    }

    createBalls(canvas) {
        const ball1 = new Ball(canvas.width / 2 - 20, canvas.height - 70, 2, -2, 7, canvas.width, canvas.height);
        return [ball1];
    }

    createBrickBoard() {
        return new BrickBoard(14, 14, 50, 20, this.stats.level)
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(0, 0, 180, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.paddle.draw(this.ctx);
        this.paddle.move();

        this.balls.forEach(ball => ball.draw(this.ctx));

        this.brickBoard.draw(this.ctx);

        this.balls.forEach(ball => {
            checkBallPaddleCollision(ball, this.paddle);
            checkBallBricksCollision(ball, this.brickBoard, this.stats);
        });


        let noBricksLeft = !this.brickBoard.bricks.length;
        if (noBricksLeft) {
            this.nextLevel();
        }

        this.stats.printStats();
    }

    nextLevel() {
        this.stats.level += 1;
        this.balls = this.createBalls();
        this.brickBoard = this.createBrickBoard();
    }

    addListeners() {
        window.addEventListener("lostball", (event) => {
            if (this.stats.lives > 1) {
                this.lostBall();
            } else {
                this.gameOver();
            }
        }, true);


    }

    resetPaddle() {
        this.paddle.removeListeners();
        this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 50, 50, 15, 0, this.canvas.width);
    }

    lostBall() {
        this.stats.lives -= 1;
        window.alert("Ball lost! Lives left: " + this.stats.lives);
        this.resetPaddle();
        this.balls = this.createBalls(this.canvas);
    }

    gameOver() {
        window.alert("Game over :(");

        const score = this.stats.points;
        
        this.resetPaddle();
        this.balls = this.createBalls(this.canvas);
        this.stats = new Stats(5);
        this.brickBoard = this.createBrickBoard();

        this.stats.highscore = score;

    }
}
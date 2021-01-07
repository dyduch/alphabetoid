import {Ball} from "./ball.js";
import {Stats} from "./stats.js";
import {Paddle} from "./paddle.js";
import {BrickBoard} from "./bricks.js";
import {checkBallPaddleCollision} from "./paddleCollision.js";
import {checkBallBricksCollision} from "./bricksCollision.js";
import {getRandomBonus} from "./bonus/bonusSelector.js";

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.balls = this.createBalls(this.canvas);
        this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 50, 70, 15, 0, this.canvas.width);
        this.stats = new Stats(5);
        this.brickBoard = this.createBrickBoard();
        this.canApplyBonus = true;

        this.addListeners();
    }

    createBalls() {
        const ball1 = new Ball(this.canvas.width / 2 - 20, this.canvas.height - 70, 2, -2, 7, this.canvas.width, this.canvas.height);
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

        if (this.stats.points !== 0 && this.stats.points % 10 === 0 && this.canApplyBonus) {
            const bonus = getRandomBonus(this.balls, this.paddle);
            if (bonus !== null && !this.stats.bonuses.includes(bonus.name)) {
                this.applyBonus(bonus);
                this.canApplyBonus = false;
            }
        }

        if (this.stats.points % 10 !== 0 && !this.canApplyBonus) {
            this.canApplyBonus = true;
        }
    }

    nextLevel() {
        if (this.stats.level === this.stats.maxLevel) {
            this.gameWon();
        }
        this.stats.level += 1;
        this.balls = this.createBalls();
        this.brickBoard = this.createBrickBoard();
    }

    addListeners() {
        window.addEventListener("lostball", (event) => {
            if (this.stats.lives > 1) {
                this.lostBall(event.ball);
            } else {
                this.gameOver();
            }
        }, true);

    }

    resetPaddle() {
        this.paddle.removeListeners();
        this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 50, 70, 15, 0, this.canvas.width);
    }

    lostBall(ball) {
        console.log("ball lost")
        if (this.balls.length > 1) {
            const index = this.balls.indexOf(ball);
            if (index !== -1) {
                this.balls.splice(index, 1);
            }

        } else { //last ball
            this.stats.lives -= 1;
            window.alert("Ball lost! Lives left: " + this.stats.lives);
            this.resetPaddle();
            this.balls = this.createBalls(this.canvas);
        }
    }

    gameOver() {
        window.alert("Game over :(");
        this.endGame();

    }

    gameWon() {
        window.alert("You Win!!!");
        this.endGame();
    }

    endGame() {
        const score = this.stats.points;

        this.resetPaddle();
        this.balls = this.createBalls(this.canvas);
        this.stats = new Stats(5);
        this.brickBoard = this.createBrickBoard();

        this.stats.highscore = score;
    }

    applyBonus(bonus) {
        this.stats.bonuses.push(bonus.name);
        bonus.applyBonus();
        setTimeout(this.resetBonus.bind(this), 15000, bonus);
    }

    resetBonus(bonus) {
        this.stats.bonuses.shift();
        bonus.removeBonus();
    }
}
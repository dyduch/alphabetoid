import {Bonus} from "./bonus.js";

export class FastPaddleBonus extends Bonus {
    constructor(paddle) {
        super();
        this.name = "Fast Paddle";
        this.paddle = paddle;
    }

    applyBonus() {
        this.paddle.speed *= 2;
    }

    removeBonus() {
        this.paddle.speed /= 2;
    }
}
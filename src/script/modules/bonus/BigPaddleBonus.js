import {Bonus} from "./bonus.js";

export class BigPaddleBonus extends Bonus {
    constructor(paddle) {
        super();
        this.name = "Big Paddle";
        this.paddle = paddle;
    }

    applyBonus() {
        this.paddle.width += 20;
    }

    removeBonus() {
        this.paddle.width -= 20;
    }
}
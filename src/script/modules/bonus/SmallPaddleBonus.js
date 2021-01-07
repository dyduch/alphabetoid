import {Bonus} from "./bonus.js";

export class SmallPaddleBonus extends Bonus {
    constructor(paddle) {
        super();
        this.name = "Small Paddle";
        this.paddle = paddle;
    }

    applyBonus() {
        this.paddle.width -= 20;
    }

    removeBonus() {
        this.paddle.width += 20;
    }
}
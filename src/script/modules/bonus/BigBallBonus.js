import {Bonus} from "./bonus.js";

export class BigBallBonus extends Bonus {
    constructor(balls) {
        super();
        this.name = "Big Ball";
        this.balls = balls;
    }

    applyBonus() {
        this.balls.forEach(ball => {
            ball.radius = ball.radius + 2;
        });
    }

    removeBonus() {
        this.balls.forEach(ball => {
            ball.radius = ball.defaultRadius;
        });
    }
}
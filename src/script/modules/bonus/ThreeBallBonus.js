import {Bonus} from "./bonus.js";
import {Ball} from "../ball.js";

export class ThreeBallBonus extends Bonus {
    constructor(balls) {
        super();
        this.name = "3 Balls";
        this.balls = balls;
    }

    applyBonus() {
        const ogBall = this.balls[0];

        const newBall1 = new Ball(ogBall.x + ogBall.radius + 1, ogBall.y + ogBall.radius + 1, -ogBall.dx, ogBall.dy, ogBall.radius, ogBall.maxX, ogBall.maxY);
        const newBall2 = new Ball(ogBall.x - ogBall.radius - 1, ogBall.y - ogBall.radius - 1, ogBall.dx, -ogBall.dy, ogBall.radius, ogBall.maxX, ogBall.maxY);

        this.balls.push(newBall1);
        this.balls.push(newBall2);
    }

    removeBonus() {
        while (this.balls.length > 1) {
            this.balls.pop();
        }
    }
}
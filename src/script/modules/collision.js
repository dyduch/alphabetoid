import {Ball} from "./ball.js"
import {Paddle} from "./paddle.js";

function checkCollisionOnYAxis(ball, paddle) {
    const paddleContactMinY = Number(paddle.y);
    const paddleContactMaxY = Number(paddle.y + paddle.radius);
    return ball.y > paddleContactMinY && ball.y <= paddleContactMaxY;
}

function leftSidePaddleHit(ball, paddle) {
    const paddleLeft = paddle.x;
    return ball.x >= paddleLeft && ball.x < paddleLeft + paddle.radius * 2;
}

function middlePaddleHit(ball, paddle) {
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;
    return ball.x >= paddleLeft + paddle.radius * 2 && ball.x < paddleRight - paddle.radius * 2;
}

function rightSidePaddleHit(ball, paddle) {
    const paddleRight = paddle.x + paddle.width;
    return ball.x >= paddleRight - paddle.radius * 2 && ball.x <= paddleRight;
}

function changeSpeedForSameSide(ball) {
    if (Math.abs(ball.dx) === ball.baseDx) {
        ball.dx = ball.baseDx * 2;
        ball.dy = ball.baseDy / 2;
    } else if (Math.abs(ball.dx) === ball.baseDx * 2) {
        // change nothing
    } else if (Math.abs(ball.dx) === ball.baseDx / 2) {
        ball.dx = ball.baseDx;
        ball.dy = ball.baseDy;
    }
}

function changeSpeedForDifferentSide(ball) {
    if (Math.abs(ball.dx) === ball.baseDx) {
        // change nothing
    } else if (Math.abs(ball.dx) === ball.baseDx * 2) {
        ball.dx = ball.baseDx / 2;
        ball.dy = ball.baseDy * 2;
    } else if (Math.abs(ball.dx) === ball.baseDx / 2) {
        ball.dx = ball.baseDx * 2;
        ball.dy = ball.baseDy / 2;
    }
}

export function checkBallPaddleCollision(ball, paddle) {


    if (checkCollisionOnYAxis(ball, paddle)) {

        const ballGoingLeft = ball.dx < 0;
        const ballGoingRight = ball.dx > 0;

        if (leftSidePaddleHit(ball, paddle)) {
            if (ballGoingRight) {
                ball.dx = -ball.dx;
            }
            ball.dy = -ball.dy;

            if (ballGoingLeft) {
                changeSpeedForSameSide(ball);
            } else {
                changeSpeedForDifferentSide(ball);
            }

        }
        if (middlePaddleHit(ball, paddle)) {
            ball.dy = -ball.dy;
        }
        if (rightSidePaddleHit(ball, paddle)) {
            if (ballGoingLeft) {
                ball.dx = -ball.dx;
            }
            ball.dy = -ball.dy;

            if (ballGoingRight) {
                changeSpeedForSameSide(ball);
            } else {
                changeSpeedForDifferentSide(ball);
            }


        }
    }
}
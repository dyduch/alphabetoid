import {Ball} from "./ball.js"
import {Paddle} from "./paddle.js";

function checkCollisionOnYAxis(ball, paddle) {
    return ball.y >= paddle.y - 2 && ball.y <= paddle.y + 2;
}

function leftSidePaddleHit(ball, paddle) {
    const paddleLeft = paddle.x;
    return ball.x >= paddleLeft - 2 && ball.x < paddleLeft + paddle.width / 4;
}

function middlePaddleHit(ball, paddle) {
    const paddleLeft = paddle.x;
    const paddleRight = paddle.x + paddle.width;
    return ball.x >= paddleLeft + paddle.width / 4 && ball.x < paddleRight - paddle.width / 4;
}

function rightSidePaddleHit(ball, paddle) {
    const paddleRight = paddle.x + paddle.width;
    return ball.x >= paddleRight - paddle.width / 4 && ball.x <= paddleRight + 2;
}

function changeSpeedForSameSide(ball) {
    const xDirection = ball.dx / Math.abs(ball.dx);
    const yDirection = ball.dy / Math.abs(ball.dy);

    if (Math.abs(ball.dx) === ball.baseDx) {
        ball.dx = ball.baseDx * 2 * xDirection;
        ball.dy = ball.baseDy / 2 * yDirection;
    } else if (Math.abs(ball.dx) === ball.baseDx * 2) {
        // change nothing
    } else if (Math.abs(ball.dx) === ball.baseDx / 2) {
        ball.dx = ball.baseDx * xDirection;
        ball.dy = ball.baseDy * yDirection;
    }
}

function changeSpeedForDifferentSide(ball) {
    const xDirection = ball.dx / Math.abs(ball.dx);
    const yDirection = ball.dy / Math.abs(ball.dy);

    if (Math.abs(ball.dx) === ball.baseDx) {
        // change nothing
    } else if (Math.abs(ball.dx) === ball.baseDx * 2) {
        ball.dx = ball.baseDx / 2 * xDirection;
        ball.dy = ball.baseDy * 2 * yDirection;
    } else if (Math.abs(ball.dx) === ball.baseDx / 2) {
        ball.dx = ball.baseDx * 2 * xDirection;
        ball.dy = ball.baseDy / 2 * yDirection;
    }
}

function updateBallSpeed(ballGoingOnFarSide, ball) {
    if (!ballGoingOnFarSide) {
        ball.dx = -ball.dx;
    }
    ball.dy = -ball.dy;

    if (ballGoingOnFarSide) {
        changeSpeedForSameSide(ball);
    } else {
        changeSpeedForDifferentSide(ball);
    }
}

function updateBallSpeedForRightPaddleSide(ball) {
    const ballGoingOnFarSide = ball.dx > 0;
    updateBallSpeed(ballGoingOnFarSide, ball);
}

function updateBallSpeedForLeftPaddleSide(ball) {
    const ballGoingOnFarSide = ball.dx < 0;
    updateBallSpeed(ballGoingOnFarSide, ball);
}

export function checkBallPaddleCollision(ball, paddle) {

    if (checkCollisionOnYAxis(ball, paddle)) {

        if (leftSidePaddleHit(ball, paddle)) {
            updateBallSpeedForLeftPaddleSide(ball);
        }
        else if (middlePaddleHit(ball, paddle)) {
            ball.dy = -ball.dy;
        }
        else if (rightSidePaddleHit(ball, paddle)) {
            updateBallSpeedForRightPaddleSide(ball);
        }
    }
}
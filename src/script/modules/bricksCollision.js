import {BrickBoard, Brick} from "./bricks.js";
import {Stats} from "./stats.js";

function collidesLeft(ball, brick) {
    return ball.x + ball.radius >= brick.x - 2 && ball.x + ball.radius <= brick.x + 2
        && (ball.y >= brick.y && ball.y <= brick.y + brick.height);
}

function collidesRight(ball, brick) {
    return ball.x - ball.radius >= brick.x + brick.width - 2 && ball.x - ball.radius <= brick.x + brick.width + 2
        && (ball.y >= brick.y && ball.y <= brick.y + brick.height);
}

function collidesDown(ball, brick) {
    return ball.y - ball.radius >= brick.y + brick.height - 2 && ball.y - ball.radius <= brick.y + brick.height + 2
        && (ball.x >= brick.x && ball.x <= brick.x + brick.width);
}

function collidesUp(ball, brick) {
    return ball.y + ball.radius >= brick.y - 2 && ball.y + ball.radius <= brick.y + 2
        && (ball.x >= brick.x && ball.x <= brick.x + brick.width);
}

function collidesWithBall(ball, brick) {
    return collidesLeft(ball, brick)
        || collidesRight(ball, brick)
        || collidesDown(ball, brick)
        || collidesUp(ball, brick);
}

function bounceBall(ball, collidingBrick) {
    if (collidesLeft(ball, collidingBrick) || collidesRight(ball, collidingBrick)) {
        ball.dx = -ball.dx;
    } else if (collidesUp(ball, collidingBrick) || collidesDown(ball, collidingBrick)) {
        ball.dy = -ball.dy;
    }
}

export function checkBallBricksCollision(ball, brickBoard, stats) {
    const collidingBrick = brickBoard.bricks.find(brick => collidesWithBall(ball, brick));
    const collidingBrickIndex = brickBoard.bricks.indexOf(collidingBrick);

    if (collidingBrickIndex !== -1) {
        brickBoard.removeBrick(collidingBrickIndex);
        bounceBall(ball, collidingBrick);
        stats.points += 1;
    }

}
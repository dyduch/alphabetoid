import {BigBallBonus} from "./BigBallBonus.js";
import {SmallBallBonus} from "./SmallBallBonus.js";
import {ThreeBallBonus} from "./ThreeBallBonus.js";
import {BigPaddleBonus} from "./BigPaddleBonus.js";
import {FastPaddleBonus} from "./FastPaddleBonus.js";
import {SmallPaddleBonus} from "./SmallPaddleBonus.js";

export function getRandomBonus(balls, paddle) {
    const randomInt = getRandomInt(0, 6);
    switch (randomInt) {
        case 0:
            return new BigBallBonus(balls);
        case 1:
            return new SmallBallBonus(balls);
        case 2:
            return new ThreeBallBonus(balls);
        case 3:
            return new BigPaddleBonus(paddle);
        case 4:
            return new SmallPaddleBonus(paddle);
        case 5:
            return new FastPaddleBonus(paddle);
        default:
            return null;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

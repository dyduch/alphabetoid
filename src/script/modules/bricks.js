import { getBlockNumbersForLetter} from "./alphabet.js";

export class BrickBoard {

    constructor(rows, columns, brickWidth, brickHeight, level) {
        this.rows = rows;
        this.columns = columns
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        this._level = level;

        this._bricks = this.createBricks();
    }

    createBricks() {
        let brickBoard = [];

        var positions = getBlockNumbersForLetter(this.getLetterBasedOnLevel());

        const startWidth = this.brickWidth;
        const endWidth = this.brickWidth + this.columns * this.brickWidth;
        const startHeight = this.brickHeight * 2;
        const endHeight = startHeight + this.rows * this.brickHeight;

        let currentWidth = startWidth;

        let currentBrickXIndex = 0;
        let currentBrickYIndex = 0;

        while (currentWidth !== endWidth) {
            let currentHeight = startHeight;

            while (currentHeight !== endHeight) {
                let strength = this.selectStrength(positions, currentBrickXIndex, currentBrickYIndex);
                brickBoard.push(new Brick(currentWidth, currentHeight, this.brickWidth, this.brickHeight, strength));
                currentHeight += this.brickHeight;
                currentBrickYIndex += 1;
            }

            currentWidth += this.brickWidth;
            currentBrickXIndex += 1;
            currentBrickYIndex = 0;

        }

        return brickBoard;
    }

    selectStrength(positions, currentBrickXIndex, currentBrickYIndex) {
        let strength = this.getBaseStrength();

        if (positions.find(pos => pos[0] === currentBrickXIndex && pos[1] === currentBrickYIndex)) {
            strength = this.getSecondStrength();
        }
        return strength;
    }

    getBaseStrength() {
        return strengthMap[this.level][0];
    }

    getSecondStrength() {
        return strengthMap[this.level][1];
    }

    getLetterBasedOnLevel() {
        return String.fromCharCode( 64 + this.level);
    }

    removeBrick(brickIndex) {
        if (this.bricks[brickIndex].strength === 1) {
            this.bricks.splice(brickIndex, 1)
        } else {
            this.bricks[brickIndex].strength -= 1;
        }
    }

    draw(ctx) {
        this._bricks.forEach(brick => brick.draw(ctx));
    }

    get bricks() {
        return this._bricks;
    }

    set bricks(value) {
        this._bricks = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }
}

export class Brick {

    constructor(x, y, width, height, strength) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._strength = strength;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = this.getFillStyle();
        ctx.fill();
        ctx.strokeRect(this._x, this._y, this._width, this._height);
        ctx.closePath();
    }

    getFillStyle() {
        switch (this.strength) {
            case 1:
                return 'silver';
            case 2:
                return 'gold';
            case 3:
                return 'crimson';
            case 4:
                return 'seagreen';
            case 5:
                return 'lightblue';
        }
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get strength() {
        return this._strength;
    }

    set strength(value) {
        this._strength = value;
    }

}

const strengthMap = {
    1: [1, 2],
    2: [1, 2],
    3: [1, 3],
    4: [1, 3],
    5: [1, 4],
    6: [1, 4],
    7: [1, 5],
    8: [2, 1],
    9: [2, 1],
    10: [2, 3],
    11: [2, 3],
    12: [2, 4],
    13: [2, 4],
    14: [2, 5],
    15: [3, 1],
    16: [3, 2],
    17: [3, 2],
    18: [3, 4],
    19: [3, 4],
    20: [3, 5],
    21: [3, 5],
    22: [4, 1],
    23: [4, 2],
    24: [4, 3],
    25: [4, 5],
    26: [4, 5],
};
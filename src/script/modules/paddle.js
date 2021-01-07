export class Paddle {


    constructor(x, y, width, height, minLeft, maxRight, speed) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        this._radius = height / 2;

        this._speed = speed ? speed : 5;
        this.leftPressed = false;
        this.rightPressed = false;
        this._minX = minLeft;
        this._maxX = maxRight;

        this.addListeners();

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

    get radius() {
        return this._radius;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
    set width(value) {
        this._width = value;
    }

    get minX() {
        return this._minX;
    }

    get maxX() {
        return this._maxX;
    }


    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this._x + this._radius, this._y);
        ctx.arcTo(this._x + this._width, this._y, this._x + this._width, this._y + this._height, this._radius);
        ctx.arcTo(this._x + this._width, this._y + this._height, this._x, this._y + this._height, this._radius);
        ctx.arcTo(this._x, this._y + this._height, this._x, this._y, this._radius);
        ctx.arcTo(this._x, this._y, this._x + this._width, this._y, this._radius);
        ctx.closePath();

        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
        ctx.fill();
    }

    move() {
        if (this.rightPressed) {
            this.moveRight();
        } else if (this.leftPressed) {
            this.moveLeft();
        }
    }

    moveLeft() {
        if (this._x > this.minX) {
            this._x = this._x - this._speed;
        }
    }

    moveRight() {
        if ((this._x + this._width) < this.maxX) {
            this._x = this._x + this._speed;
        }
    }

    leftDown() {
        this.leftPressed = true;
    }

    leftUp() {
        this.leftPressed = false;
    }

    rightDown() {
        this.rightPressed = true;
    }

    rightUp() {
        this.rightPressed = false;
    }

    addListeners() {
        window.addEventListener("keyup", this.keyUp, true);
        window.addEventListener("keydown", this.keyDown, true);
    }

    removeListeners() {
        window.removeEventListener("keyup", this.keyUp, true);
        window.removeEventListener("keydown", this.keyDown, true);
    }

    keyUp = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (event.key === "ArrowLeft") {
            this.leftUp()
        } else if (event.key === "ArrowRight") {
            this.rightUp();
        } else {
            return;
        }
        event.preventDefault();
    }

    keyDown = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (event.key === "ArrowLeft") {
            this.leftDown()
        } else if (event.key === "ArrowRight") {
            this.rightDown();
        } else {
            return;
        }
        event.preventDefault();
    }
}
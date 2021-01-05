export class Paddle {


    constructor(x, y, width, height, minLeft, maxRight) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;

        this._radius = height / 2;

        this.speed = 5;
        this.leftPressed = false;
        this.rightPressed = false;
        this.minX = minLeft;
        this.maxX = maxRight;

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
            this._x = this._x - this.speed;
        }
    }

    moveRight() {
        if ((this._x + this._width) < this.maxX) {
            this._x = this._x + this.speed;
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
        window.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
                return;
            }

            if (event.key === "ArrowLeft") {
                this.leftDown();
            } else if (event.key === "ArrowRight") {
                this.rightDown();
            } else {
                return;
            }
            event.preventDefault();
        }, true);

        window.addEventListener("keyup", (event) => {
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
        }, true);

    }
}
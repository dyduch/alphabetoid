export class Ball {
    constructor(x, y, dx, dy, radius, maxX, maxY) {

        this._x = x;
        this._y = y;
        this._dx = dx;
        this._dy = dy;

        this._baseDx = Math.abs(dx);
        this._baseDy = Math.abs(dy);

        this._radius = radius;

        this.minX = 0;
        this.minY = 0;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get dx() {
        return this._dx;
    }

    get dy() {
        return this._dy;
    }

    get baseDx() {
        return this._baseDx;
    }

    get baseDy() {
        return this._baseDy;
    }

    get radius() {
        return this._radius;
    }

    set dx(value) {
        this._dx = value;
    }

    set dy(value) {
        this._dy = value;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, 0, Math.PI*2);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();
        ctx.closePath();
        this.move();
    }

    move() {
        this._x = this._x + this._dx;
        this._y = this._y + this._dy;

        if (this._x >= this.maxX || this._x <= this.minX) {
            this._dx = -this._dx;
        }
        
        if (this._y <= this.minY ) {
            this._dy = -this._dy;
        }

        if (this._y >= this.maxY ) {
            window.dispatchEvent(new Event('lostball'));
        }

    }
}
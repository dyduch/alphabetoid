export class Stats {
    get bonuses() {
        return this._bonuses;
    }
    constructor(lives) {
        this._level = 1;
        this._points = 0;
        this._lives = lives;
        this._highscore = 0;
        this._maxLevel = 26;
        this._bonuses = [];
    }

    set level(value) {
        this._level = value;
    }

    set points(value) {
        this._points = value;
    }

    set lives(value) {
        this._lives = value;
    }
    get lives() {
        return this._lives;
    }

    get level() {
        return this._level;
    }

    get points() {
        return this._points;
    }

    get highscore() {
        return this._highscore;
    }

    set highscore(value) {
        this._highscore = value;
    }

    get maxLevel() {
        return this._maxLevel;
    }


    printStats() {
        this.printSingleStat("level", this._level);
        this.printSingleStat("points", this._points);
        this.printSingleStat("lives", this._lives);
        this.printSingleStat("highscore", this._highscore);
        this.printSingleStat("bonuses", this._bonuses);
    }

    printSingleStat(name, value) {
        const span = document.getElementById(name);
        if (span.textContent !== value) {
            span.textContent = value;
        }
    }

}
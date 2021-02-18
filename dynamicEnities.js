class DynamicEntity extends Entity {
    constructor(properties) {
        super(-1, -1, properties);

        this.clear();
    }

    hide() {
        this.shown = false;
    }

    show() {
        this.shown = true;
    }

    clear() {
        this.update(-1, -1);
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context) {
        super.draw(context);
    }

    build() {
        return new Entity(this.x, this.y, { color: this.color });
    }
}

class DynamicBox extends DynamicEntity {
    constructor() {
        super(-1, -1);
        this.clear();
    }

    clear(x = -1, y = -1) {
        super.clear();
        this.progressState = 0;
        this.x2 = x;
        this.y2 = y;
    }

    update(x, y) {
        if (this.progressState == 0) {
            this.x = x;
            this.y = y;
            this.x2 = x + 2;
            this.y2 = y + 2;
        } else if (this.progressState == 1) {
            this.x2 = x;
            this.y2 = y;
        }
    }

    __getRealCoords() {
        return {
            x: Math.min(this.x, this.x2),
            y: Math.min(this.y, this.y2),
            width: Math.max(this.x, this.x2) - Math.min(this.x, this.x2),
            height: Math.max(this.y, this.y2) - Math.min(this.y, this.y2),
        }
    }

    progress(x, y) {
        this.update(x, y);
        this.progressState++;
    }

    draw(context) {
        let { x, y, width, height } = this.__getRealCoords();
        context.save();
        context.strokeStyle = "#000"
        context.lineWidth = 2;
        context.strokeRect(x, y, width, height);
        context.restore();
    }

    isFinished() {
        return this.progressState > 1;
    }

    build() {
        let { x, y, width, height } = this.__getRealCoords();
        return new Box(x, y, width, height)
    }
}
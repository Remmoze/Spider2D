class Entity {
    constructor(x, y, properties = {}) {
        this.x = x;
        this.y = y;
        this.color = properties.color ? properties.color : "white";
        this.size = properties.size ? properties.size : 8;
        this.shown = properties.shown ? properties.shown : true;
    }

    draw(context) {
        if (!this.shown)
            return;

        context.save()
        context.fillStyle = this.color;
        context.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        context.restore();
    }
}

class Box {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.save();
        context.strokeStyle = "#000"
        context.lineWidth = 2;
        context.strokeRect(this.x, this.y, this.width, this.height);
        context.restore();
    }
}
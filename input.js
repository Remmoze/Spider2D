class Input {
    constructor(window) {
        this.mouseSubscribers = new Map();
        this.keyboardSubscribers = new Map();
        this.keys = new Map();
        this.keysJustPressed = new Map();

        window.addEventListener('click', e => {
            this.mouseSubscribers.get("click").forEach(sub => {
                sub(e.offsetX, e.offsetY)
            });
        });

        //maybe will need something move than x,y?
        window.addEventListener('mousemove', e => {
            this.mouseSubscribers.get("move").forEach(sub => {
                sub(e.offsetX, e.offsetY);
            });
        });

        window.addEventListener('keydown', e => {
            if (this.keyboardSubscribers.has(e.code)) {
                this.keyboardSubscribers.get(e.code)(true);
            }
            if (this.keys.has(e.code)) {
                this.keys.set(e.code, true);
            }
            if (!this.keysJustPressed.has(e.code)) {
                this.keysJustPressed.set(e.code, true);
            }
        });

        window.addEventListener('keyup', e => {
            if (this.keyboardSubscribers.has(e.code)) {
                this.keyboardSubscribers.get(e.code)(false);
            }
            if (this.keys.has(e.code)) {
                this.keys.set(e.code, false);
            }
            if (this.keysJustPressed.has(e.code)) {
                this.keysJustPressed.set(e.code, false);
            }
        });
    }

    __mouseEventCheck(event) {
        if (!this.mouseSubscribers.has(event)) {
            this.mouseSubscribers.set(event, []);
        }
    }

    subscribeToMouse(event, callback) {
        if (event == "mousemove")
            event = "move";

        this.__mouseEventCheck(event);
        this.mouseSubscribers.get(event).push(callback);
    }

    subscribeToKey(key, callback) {
        if (callback)
            this.keyboardSubscribers.set(key, callback);
        if (!this.keys.has(key))
            this.keys.set(key, false);
    }

    isKeyPressed(key) {
        return this.keys.has(key) ? this.keys.get(key) : false;
    }

    isKeyJustPressed(key) {
        return this.keysJustPressed.has(key) ? this.keysJustPressed.get(key) : false;
    }

    update() {
        for (let key in this.keysJustPressed.keys) {
            this.keysJustPressed.set(key, null);
        }
    }
}
class Input {
    constructor(window) {
        this.mouseSubscribers = new Map();
        this.keyboardSubscribers = new Map();

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
        });

        window.addEventListener('keyup', e => {
            if (this.keyboardSubscribers.has(e.code)) {
                this.keyboardSubscribers.get(e.code)(false);
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
        this.keyboardSubscribers.set(key, callback);
    }
}
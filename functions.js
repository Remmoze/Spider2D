function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function AddLeg(x, y) {
    if (legs.length > 3) {
        legs.shift()
    }

    let newp = FindClosest(x, y);

    legs.push(new Entity(newp.x, newp.y));

    RelocatePlayer()
}

function Move(x, y) {
    Player.x = x;
    Player.y = y;
}

function RelocatePlayer() {
    if (legs.length < 2) return;

    let nx = legs.map(x => x.x).reduce((x, y) => x + y) / legs.length;
    let ny = legs.map(x => x.y).reduce((x, y) => x + y) / legs.length;

    Move(nx, ny);
}

function AddBox(x, y) {
    let width = 50 + Random(0, 30);
    let height = 50 + Random(0, 30);
    boxes.push(new Box(x - width / 2, y - height / 2, width, height));
}

function SqrdLength(x1, y1, x2, y2) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2;
}

function FindClosest(x, y) {
    if (boxes.length < 1) return false;

    let cx = 0;
    let cy = 0;
    let length = -1;
    for (let box of boxes) {
        let closeX = Math.max(box.x, Math.min(box.x + box.width, x));
        let closeY = Math.max(box.y, Math.min(box.y + box.height, y));
        let len = SqrdLength(closeX, closeY, x, y);
        if (length == -1 || len < length) {
            length = len;
            cx = closeX;
            cy = closeY;
        }
    }
    if (length == -1) {
        console.warn("something is wrong.")
        return false;
    }

    return { x: cx - 2, y: cy - 2 };
}
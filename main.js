const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

const legs = [];
const tempLeg = new Entity(-1, -1, "lightgreen")
const Player = new Entity(10, 10, "white");

const boxes = [];


function redraw(time) {
    context.fillStyle = "#222"
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let box of boxes) {
        box.draw(context);
    }

    context.strokeStyle = "#00FF0033"
    context.lineWidth = 1;
    context.beginPath();
    for (let leg of legs) {
        context.moveTo(Player.x + 5, Player.y + 5);
        context.lineTo(leg.x + 2, leg.y + 2);
    }
    context.stroke();
    context.closePath();

    for (let leg of legs) {
        leg.draw(context);
    }
    if (tempLeg.x != -1 && tempLeg.y != -1) {
        tempLeg.draw(context);
    }

    Player.draw(context);
    requestAnimationFrame(redraw);
}

function main() {
    let ctrl = false;

    window.addEventListener('keydown', e => {
        if (e.code == "ControlLeft") {
            ctrl = true;
        }
    });

    window.addEventListener('keyup', e => {
        if (e.code == "ControlLeft") {
            ctrl = false;
        }
    });

    window.addEventListener('click', e => {
        let x = e.offsetX;
        let y = e.offsetY;
        if (ctrl) {
            AddBox(x, y)
        } else {
            AddLeg(x, y);
        }
    });

    window.addEventListener('mousemove', e => {
        if (ctrl) {
            tempLeg.x = -1;
            tempLeg.y = -1;
        } else {
            let point = FindClosest(e.offsetX, e.offsetY);
            tempLeg.x = point ? point.x : -1;
            tempLeg.y = point ? point.y : -1;
        }

    })

    boxes.push(new Box(50, 50, 50, 500))
    boxes.push(new Box(100, 600, 300, 50))
    boxes.push(new Box(500, 300, 100, 200))
    boxes.push(new Box(200, 150, 200, 100))
    boxes.push(new Box(650, 650, 100, 100))

    redraw();
}

main();
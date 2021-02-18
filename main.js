const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

const input = new Input(window);

const legs = [];
const Player = new Entity(10, 10, { color: "white" });

const boxes = [];
const NewLeg = new DynamicEntity({ color: "lightgreen" });
const NewBox = new DynamicBox();


function main() {
    input.subscribeToKey("ControlLeft");

    input.subscribeToMouse('click', (x, y) => {
        if (input.isKeyPressed("ControlLeft")) {
            NewBox.progress(x, y);
            if (NewBox.isFinished()) {
                boxes.push(NewBox.build());
                NewBox.clear(x, y);
            }
        } else {
            let point = FindClosest(x, y);
            NewLeg.update(point.x, point.y);
            AddLeg(NewLeg.build())
            NewLeg.clear();
        }
    });

    input.subscribeToMouse('move', (x, y) => {
        if (input.isKeyPressed("ControlLeft")) {
            NewBox.update(x, y);
        } else {
            let point = FindClosest(x, y);
            NewLeg.update(point.x, point.y);
        }
    });

    boxes.push(new Box(50, 50, 50, 500))
    boxes.push(new Box(100, 600, 300, 50))
    boxes.push(new Box(500, 300, 100, 200))
    boxes.push(new Box(200, 150, 200, 100))
    boxes.push(new Box(650, 650, 100, 100))

    redraw();
}



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
        context.moveTo(Player.x, Player.y);
        context.lineTo(leg.x, leg.y);
    }
    context.stroke();
    context.closePath();

    for (let leg of legs) {
        leg.draw(context);
    }

    NewBox.draw(context);
    NewLeg.draw(context);
    Player.draw(context);
    requestAnimationFrame(redraw);

    //move to update();
    let ctrl = input.isKeyJustPressed("ControlLeft");
    if (ctrl != null) {
        if (ctrl) {
            NewBox.clear();
            NewBox.show()
            NewLeg.hide();
        } else {
            NewLeg.clear();
            NewLeg.show();
            NewBox.hide();
        }
    }

    input.update();
}

main();
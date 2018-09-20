// GLOBAL VARS
let drawNode = false;
let drawLine = false;
let CircleArray = [];
let linePoints = [];

// UI vars
const draw = document.getElementById('draw');
const erase = document.getElementById('erase');
const line = document.getElementById('line');


// EVENT LISTENERS

draw.addEventListener('click', () => {
    drawNode = true;
    drawLine = false;
});

erase.addEventListener('click', () => {
    drawNode = false;
    drawLine = false;
});

line.addEventListener('click', () => {
    drawNode = false;
    drawLine = true;
});


// init

let init = (e) => {
        x = e.clientX;
        y = e.clientY;
        console.log(x, y);

        if (isPointInNode(x, y) === true) {
            console.log('yes');
            drawNode = false;
            if (drawLine == true) {
                createLine(x, y);
            }
        } else {
            createNode(x, y);

        }
    }
    // CREATE CIRCLE
let createNode = (x, y) => {

    if (drawNode === true) {

        // c.strokeStyle = 'rgb(0,30,40)';
        // c.beginPath();
        // c.arc(x, y, 60, 0, 360, false);
        // c.stroke();

        c.fillStyle = 'rgb(0,30,40)';
        c.beginPath();
        c.arc(x, y, 30, 0, 360, false);
        c.fill();
        CircleArray.push({ x, y });
    }
}

// CONNECTS TWO NODES
let createLine = (x, y) => {
    let drawPoint = getExactPoint(x, y);
    // console.log(drawPoint.x, drawPoint.y);

    linePoints.push({ x: drawPoint.x, y: drawPoint.y });

    if (linePoints.length === 2) {
        c.beginPath();
        c.moveTo(linePoints[0].x, linePoints[0].y);
        c.lineTo(linePoints[1].x, linePoints[1].y);
        c.stroke();
        linePoints = [];
    }


}




// CHECKS IF THE MOUSE COORDS ARE ON A DRAWN CIRCLE OR NOT
let isPointInNode = (x, y) => {
    for (let i = 0; i < CircleArray.length; i++) {
        if (x > CircleArray[i].x - 30 && x < CircleArray[i].x + 30 && y > CircleArray[i].y - 30 && y < CircleArray[i].y + 30) {
            return true;

        }
    }
}

let getExactPoint = (x, y) => {
    for (let i = 0; i < CircleArray.length; i++) {
        if (x > CircleArray[i].x - 30 && x < CircleArray[i].x + 30 && y > CircleArray[i].y - 30 && y < CircleArray[i].y + 30) {
            return {
                x: CircleArray[i].x,
                y: CircleArray[i].y
            }

        }
    }
}
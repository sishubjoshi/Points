// GLOBAL VARS
let drawNode = false;
let drawLine = false;
let CircleArray = [];


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


// CREATE CIRCLE
let createNode = (e) => {
    x = e.clientX;
    y = e.clientY;
    console.log(x, y);

    if (isPointInNode(x, y) === true) {
        console.log('yes');
        drawNode = false;
    }

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
let createLine = () => {

}



// CHECKS IF THE MOUSE COORDS ARE ON A DRAWN CIRCLE OR NOT
let isPointInNode = (x, y) => {
    for (let i = 0; i < CircleArray.length; i++) {
        if (x > CircleArray[i].x - 30 && x < CircleArray[i].x + 30 && y > CircleArray[i].y - 30 && y < CircleArray[i].y + 30) {
            return true;

        }
    }
}
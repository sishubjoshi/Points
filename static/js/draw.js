let letUserDraw = false;
let CircleArray = [];


// UI vars
const draw = document.getElementById('draw');
const erase = document.getElementById('erase');

draw.addEventListener('click', () => {
    letUserDraw = true;
});

erase.addEventListener('click', () => {
    letUserDraw = false;
});
let createCircle = (e) => {
    x = e.clientX;
    y = e.clientY;
    console.log(x, y);

    if (CircleArray.length !== 0) {
        for (let i = 0; i < CircleArray.length; i++) {
            if (x > CircleArray[i].x - 30 && x < CircleArray[i].x + 30 && y > CircleArray[i].y - 30 && y < CircleArray[i].y + 30) {
                console.log('yes');
                letUserDraw = false;
            }
        }
    }

    if (letUserDraw === true) {

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
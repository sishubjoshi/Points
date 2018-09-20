/**
 *  Version 2:
 *  After using classes it's a lot cleaner now and it's easy to add new features...
 * 
 */


class Draw {
    constructor() {
        this.drawNode = false;
        this.drawLine = false;
        // stores all the coords...
        this.circleArray = [];
        // stores coords of two nodes/circles which will be connected through a line...
        this.linePoints = [];
    }

    // create a node/dot
    createNode(x, y) {
        c.fillStyle = 'rgb(266,129,200)';
        c.beginPath();
        c.arc(x, y, 30, 0, 360, false);
        c.fill();
        this.circleArray.push({ x, y });
    }


    // connect two nodes or dots
    createLine(x, y) {
        let drawPoint = this.getExactPoint(x, y);
        // console.log(drawPoint.x, drawPoint.y);

        this.linePoints.push({ x: drawPoint.x, y: drawPoint.y });

        if (this.linePoints.length === 2) {
            c.beginPath();
            c.moveTo(this.linePoints[0].x, this.linePoints[0].y);
            c.lineTo(this.linePoints[1].x, this.linePoints[1].y);
            c.lineWidth = 5;
            c.stroke();

            // when line is drawn it overlaps the nodes
            // the below commands draw two circles on top of it. So, it
            // hides the lines...
            this.createNode(this.linePoints[0].x, this.linePoints[0].y);
            this.createNode(this.linePoints[1].x, this.linePoints[1].y);

            // empty the array of points
            this.linePoints = [];
        }

    }

    // Returns whether the selected point lies inside the node/dot or not 
    isPointInNode(x, y) {
            for (let i = 0; i < this.circleArray.length; i++) {
                if (x > this.circleArray[i].x - 30 && x < this.circleArray[i].x + 30 && y > this.circleArray[i].y - 30 && y < this.circleArray[i].y + 30) {
                    return true;

                }
            }
        }
        // same a the above function but it returns the coords of the node/dot 
    getExactPoint(x, y) {
        for (let i = 0; i < this.circleArray.length; i++) {
            if (x > this.circleArray[i].x - 30 && x < this.circleArray[i].x + 30 && y > this.circleArray[i].y - 30 && y < this.circleArray[i].y + 30) {
                return {
                    x: this.circleArray[i].x,
                    y: this.circleArray[i].y
                }

            }
        }
    }
}



// UI vars
const create = document.getElementById('draw');
const erase = document.getElementById('erase');
const line = document.getElementById('line');

const draw = new Draw(false, false);

// init
let init = e => {
    // mouse position
    x = e.clientX;
    y = e.clientY;

    console.log(x, y);
    if (draw.isPointInNode(x, y) === true) {
        console.log('yes');
        draw.drawNode = false;
        if (draw.drawLine === true) {
            draw.createLine(x, y);
        }
    } else {

        if (draw.drawNode === true) {
            draw.createNode(x, y);
        }
    }
}

// Event Listeners

create.addEventListener('click', () => {
    draw.drawNode = true;
    draw.drawLine = false;
});

erase.addEventListener('click', () => {
    draw.drawNode = false;
    draw.drawLine = false;
});

line.addEventListener('click', () => {
    draw.drawNode = false;
    draw.drawLine = true;
});
class Draw {
    constructor() {
        this.drawNode = false;
        this.circleArray = [];
        this.mstInputs = [];
        this.mstInputValues = [];
        this.mst = [];
    }

    createNode(x, y) {
        c.fillStyle = 'rgb(0,0,0,1)';
        c.beginPath();
        c.arc(x, y, 12, 0, 360, false);
        c.fill();
        this.circleArray.push({
            x,
            y
        });
    }

    eraseCanvas() {
        this.circleArray = [];
        this.mstInputs = [];
        this.mstInputValues = [];
        c.clearRect(0, 0, innerWidth, innerHeight);
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

    getMstInputs() {
        for(let i=0; i < this.circleArray.length; i++) {
            let cnt=0;
            for(let j=i+1; j< this.circleArray.length; j++) {
                cnt++;
                if(this.circleArray[i] == this.circleArray[j] || cnt === 3) {
                    continue;
                }
                let x1 = this.circleArray[i].x;
                let y1 = this.circleArray[i].y;
                let x2 = this.circleArray[j].x;
                let y2 = this.circleArray[j].y;

                // draw line :   just for fun
                c.beginPath();
                c.moveTo(x1, y1);
                c.lineTo(x2, y2);
                c.lineWidth = 5;
                c.stroke();
                this.mstInputValues.push({
                    x1,
                    y1,
                    x2,
                    y2
                })
                // setTimeout(() => {}, 2000);
                let distance = Math.round(Math.sqrt(((x2 - x1) ** 2 + (y2 - y1) ** 2) / 10));
                this.mstInputs.push({
                    x:i,
                    y:j,
                    d:distance

                })
                
            }
        }

        
        
        
    }


    callToApi() {
        
        fetch('https://points-server.herokuapp.com/mst', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.mstInputs)
        }).then(res => res.json())
            .then(data => this.handleCalculations(data))
            .catch(err => console.log(err))
    }

    handleCalculations(data) {
        for(let i=0; i < data.length; i++) {
            c.clearRect(0, 0, innerWidth, innerHeight);
            this.circleArray.forEach(arr => {
                c.fillStyle = 'rgb(0,0,0,1)';
                c.beginPath();
                c.arc(arr.x, arr.y, 12, 0, 360, false);
                c.fill();
            })
            for(let j=0; j < this.mstInputs.length; j++) {

                if(data[i].x == this.mstInputs[j].x && data[i].y == this.mstInputs[j].y) {
                    let index = j;
                    
                    console.log(this.mst.push(index));


                }
            }
        }
        console.log(this.mst);
        for(let i=0; i< this.mst.length; i++) {
            console.log(this.mstInputValues[this.mst[i]]);
            let x1 = this.mstInputValues[this.mst[i]].x1;
            let y1 = this.mstInputValues[this.mst[i]].y1;
            let x2 = this.mstInputValues[this.mst[i]].x2;
            let y2 = this.mstInputValues[this.mst[i]].y2;
            c.beginPath();
            c.moveTo(x1, y1);
            c.lineTo(x2, y2);
            c.lineWidth = 5;
            c.stroke();


        }
        
        
    }

}

// UI vars
const create = document.getElementById('draw');
const erase = document.getElementById('erase');
const line = document.getElementById('line');
const mst = document.getElementById('mst');

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
    draw.eraseCanvas();
});

line.addEventListener('click', () => {
    draw.drawNode = false;
    draw.drawLine = false;
    draw.getMstInputs();
});

mst.addEventListener('click', () => {
    draw.drawNode = false;
    draw.drawLine = false;
    draw.callToApi();
});
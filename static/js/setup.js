// alert(1);
const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');
canvas.style.background = '#f2f2f2';

// let mousePosition = (e) => {
//     // let x, y;
//     x = e.clientX;
//     y = e.clientY;

//     console.log(x, y);
// }


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
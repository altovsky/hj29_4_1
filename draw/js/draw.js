'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let needDrawing = false;
let needUpdating = false;
let points = [];
let riseSize = true;
let hueShift = true;
let brushSize = 100;
let hue = 5;


function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = [];
}


function drawing(event) {

  if (!needDrawing) {
    return;
  }
  const point = {
    coords: [event.offsetX, event.offsetY],
    brushSize: brushSize,
    hue: hue
  };
  points.push(point);
  hueShift = event.shiftKey;

  needUpdating = true;
}


function drawCurve() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineJoin = ctx.lineCap = 'round';
  let previousPoint = points[0];
  ctx.moveTo(...previousPoint.coords);

  for (const point of points) {

    if (previousPoint.lineEnd) {
      ctx.moveTo(...point.coords);
    } else {
      ctx.beginPath();
      ctx.quadraticCurveTo(...previousPoint.coords, ...point.coords);
      ctx.lineWidth = point.brushSize;
      ctx.strokeStyle = `hsl(${point.hue}, 100%, 50%)`;
      ctx.stroke();
    }

    previousPoint = point;
  }
}


function switchDrawing() {
  needDrawing = (event.type === 'mousedown');

  if (event.type === 'mouseup') {
    points[points.length - 1].lineEnd = true;
  }
}


function mouseLeave() {
  needDrawing = false;
}


function tick() {

  if (brushSize <= 5) {
    riseSize = true;
  }
  else if (brushSize >= 100) {
    riseSize = false;
  }
  riseSize ? brushSize++ : brushSize --;

  if (hue > 359) {
    hue = 0;
  }
  hueShift ? hue++ : hue--;

  if (needUpdating) {
    drawCurve();
    needUpdating = false;
  }
  window.requestAnimationFrame(tick);
}


window.addEventListener('load', init);
window.addEventListener('resize', init);
canvas.addEventListener('dblclick', init);
canvas.addEventListener('mousedown', switchDrawing);
canvas.addEventListener('mouseup', switchDrawing);
canvas.addEventListener('mouseleave', mouseLeave);
canvas.addEventListener('mousemove', drawing);
window.addEventListener('load', tick);

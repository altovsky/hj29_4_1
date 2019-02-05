'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = [
    '#ffffff',
    '#ffe9c4',
    '#d4fbff',
  ];


function random(min, max) {
  return Math.random() * (max - min) + min;
}


function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function getColor() {
    return colors[Math.floor(random(0, 3))];
  }

  function getStar(x, y, size, color, brightness) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = brightness;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }

  function setOptions() {
    let size = random(0, 1.1);
    const brightness = random(0.8, 1);
    const x = random(0, canvas.width);
    const y = random(0, canvas.height);
    getStar(x, y, size, getColor(), brightness);
  }

  const starsNum = random(200, 400);

  for (let key = 0; key < starsNum; key++) {
    setOptions()
  }
}


canvas.addEventListener('click', drawCanvas);
window.addEventListener('load', drawCanvas);

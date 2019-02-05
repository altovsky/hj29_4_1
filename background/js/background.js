'use strict';

const canvas = document.querySelector(`#wall`);
const ctx = canvas.getContext(`2d`);
const objectsNum = random(50, 200);

const xXX = [];
const oOO = [];


class FlickerObject {
  constructor(ctx, position, timeRelated) {
    this._ctx = ctx;
    this._startPosition = {
      x: position.x,
      y: position.y
    };
    this._Position = position;
    this._size = this.randomSize;
    this._lineWidth = this.size * 5;
    this.timeRelated = timeRelated;
  }

  draw() {
    const ctx = this.ctx;
  }

  position(x = this._Position.x, y = this._Position.y) {
    this._Position.x = x;
    this._Position.y = y;
    return this._Position;
  }

  update() {
    const newPosition = this.timeRelated(this.startPosition.x, this.startPosition.y, Date.now());
    this.position(newPosition.x, newPosition.y);
    this.draw();
  }

  get ctx() {
    return this._ctx;
  }

  get startPosition() {
    return this._startPosition;
  }

  get size() {
    return this._size;
  }

  get randomSize() {
    return Math.random() * 0.5 + 0.1;
  }

  get lineWidth() {
    return this._lineWidth;}

  get color() {
    return `#fff`;
  }
}


class CrossObject extends FlickerObject {
  constructor(ctx, position, timeRelated) {
    super(ctx, position, timeRelated);
    this.turnSpeed = random(-0.2, 0.2);
    this.angle = random(0, 360);
  }

  draw() {
    super.draw();
    const position = super.position();

    ctx.beginPath();
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.translate(-position.x, -position.y);
    ctx.moveTo(position.x + 10 * super.size, position.y + 10 * super.size);
    ctx.lineTo(position.x - 10 * super.size, position.y - 10 * super.size);
    ctx.moveTo(position.x + 10 * super.size, position.y - 10 * super.size);
    ctx.lineTo(position.x - 10 * super.size, position.y + 10 * super.size);
    ctx.lineWidth = super.lineWidth;
    ctx.restore();
    ctx.stroke();

    this.turn();
  }

  turn() {
    this.angle += this.turnSpeed;

    if (this.angle < 0) {
      this.angle = 360;
    }
    else if (this.angle > 360) {
      this.angle = 0;
    }
  }
}


class RoundObject extends FlickerObject {
  constructor(ctx, position, timeRelated) {
    super(ctx, position, timeRelated);
  }

  draw() {
    super.draw();
    const position = super.position();

    ctx.beginPath();
    ctx.arc(position.x, position.y, super.size * 12, 0, 2 * Math.PI);
    ctx.lineWidth = super.lineWidth;
    ctx.strokeStyle = super.color;
    ctx.stroke();
  }
}


function random(min, max) {
  return Math.random() * (max - min) + min;
}


function drawingObjects(fps) {

  setInterval(stepping, 1000 / fps);

  function stepping() {
    clear();

    for (let i = 0; i < objectsNum; i++) {
      xXX[i].update();
      oOO[i].update();
    }
  }
}


function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function getPosition() {

  return {
    x: random(0, canvas.width),
    y: random(0, canvas.height)
  }
}


function nextPoint() {

  return Math.round() % 2 === 0 ? f1 : f2;

  function f1(x, y, time) {

    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    }
  }

  function f2(x, y, time) {

    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
}


function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < objectsNum; i++) {
    xXX.push(new CrossObject(ctx, getPosition(), nextPoint()));
    oOO.push(new RoundObject(ctx, getPosition(), nextPoint()));
  }
}


window.addEventListener('load', init);
window.addEventListener('load', drawingObjects(20));

/// </// <reference path="../typings/Stats.d.ts"/>

import Promise = require("bluebird");
import _ = require("underscore");
import Stats = require("Stats");

var $ = document.querySelector.bind(document);
var canvas = <HTMLCanvasElement>$("#canvas");
var ctx = canvas.getContext("2d");

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

function gettingImage(url): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve: (HTMLImageElement) => void) => {
    var img = new Image();
    img.src = url;
    img.addEventListener("load", () => {
      resolve(img);
    }, false);
  });
}

var moveX = 0, moveY = 0;

function handleMove(e) {
  e.preventDefault();
  moveX = e.clientX;
  moveY = e.clientY;
}

var hedgehogs = []

function handleUp() {
  var s = Math.sqrt(Math.pow(moveX - wandX, 2) + Math.pow(moveY - wandY, 2));

  var cos = (moveX - wandX) / s;
  var sin = (moveY - wandY) / s;

  hedgehogs.push({
    x: laserX,
    y: laserY,
    cos: cos,
    sin: sin
  });
}

canvas.addEventListener("touchmove", handleMove, false);
canvas.addEventListener("mousemove", handleMove, false);
canvas.addEventListener("mouseup", handleUp, false);

var wandXRelativeToPotter = -33;
var wandYRelativeToPotter = -5;
var wandX, wandY;

var borderMargin = 2.5;
var borderLineWidth = 5;
var borderColor = "red";
// function drawBorder() {
//   ctx.lineWidth = borderLineWidth;
//   ctx.strokeStyle = borderColor;
//   ctx.moveTo(borderMargin, borderMargin);
//   ctx.lineTo(width - borderMargin, borderMargin);
//   ctx.lineTo(width - borderMargin, height - borderMargin);
//   ctx.lineTo(borderMargin, height - borderMargin);
//   ctx.lineTo(borderMargin, borderMargin - borderLineWidth / 2);
//   ctx.stroke();
// }

var potter: HTMLImageElement;
var hedgehog1: HTMLImageElement;
var hedgehog2: HTMLImageElement;
var flyingHedgehog: HTMLImageElement;
var trees: HTMLImageElement;

var images = [
  "assets/potter.png",
  "assets/hedgehog1.png",
  "assets/hedgehog2.png",
  "assets/flyingHedgehog.png",
  "assets/trees.jpg"
];

var imagesPromises = _.map(images, (url) => {
  return gettingImage(url);
});

Promise.all(imagesPromises)
.then((result) => {
  potter = result[0];
  hedgehog1 = result[1];
  hedgehog2 = result[2];
  flyingHedgehog = result[3];
  trees = result[4];

  wandX = width / 2 + wandXRelativeToPotter;
  wandY = height - potter.height / 2 + wandYRelativeToPotter;

  window.requestAnimationFrame(gameLoop);
});

var oldTime = 0;

var laserX, laserY;

function gameLoop(time) {
  var timeDiff = time - oldTime;

  ctx.drawImage(trees, 0, 0, width, height)

  // drawBorder();

  ctx.drawImage(potter, (width - potter.width) / 2, height - potter.height);

  var laserLength = 100;

  function drawLaser() {
    var s = Math.sqrt(Math.pow(moveX - wandX, 2) + Math.pow(moveY - wandY, 2));

    var cos = (moveX - wandX) / s;
    var sin = (moveY - wandY) / s;

    laserX = cos * laserLength + wandX;
    laserY = sin * laserLength + wandY;

    ctx.lineWidth = borderLineWidth;
    ctx.strokeStyle = borderColor;

    ctx.beginPath();
    ctx.moveTo(wandX, wandY);
    ctx.lineTo(laserX, laserY);
    ctx.stroke();
  }
  drawLaser();

  hedgehogs.forEach((hedgehog) => {
    var v = 300;
    var rotateRatio = 50;

    var laserLength = v * timeDiff / 1000;

    var laserX, laserY;

    laserX = hedgehog.cos * laserLength + hedgehog.x;
    laserY = hedgehog.sin * laserLength + hedgehog.y;

    hedgehog.x = laserX;
    hedgehog.y = laserY;

    ctx.save();
    ctx.translate(hedgehog.x, hedgehog.y);
    ctx.rotate(time / rotateRatio);
    ctx.drawImage(flyingHedgehog, -flyingHedgehog.width / 8, -flyingHedgehog.height / 8, flyingHedgehog.width / 4, flyingHedgehog.height / 4);
    ctx.restore();
  });

  oldTime = time;
  window.requestAnimationFrame(gameLoop);
}

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";

document.body.appendChild( stats.domElement );

var update = function () {
    stats.begin();
    stats.end();
    requestAnimationFrame( update );
};

requestAnimationFrame( update );

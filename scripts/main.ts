import Promise = require("bluebird");
import Stats = require("Stats");
import Game = require("./Game");
import ImageLoader = require("./ImageLoader");
import Apple = require("./Apple");
import Hedgehog = require("./Hedgehog");

window.onerror = function(e) {
  alert(e);
};

var $ = document.querySelector.bind(document);
var canvas = <HTMLCanvasElement>$("#canvas");
var ctx = canvas.getContext("2d");

Game.ctx = ctx;
Game.width = window.innerWidth;
Game.height = window.innerHeight;

canvas.width = Game.width;
canvas.height = Game.height;

var moveX = 0, moveY = 0;

function handleMove(e) {
  e.preventDefault();
  moveX = e.clientX;
  moveY = e.clientY;
}

var hedgehogs = new Array<Hedgehog>();

function handleUp() {
  var s = Math.sqrt(Math.pow(moveX - wandX, 2) + Math.pow(moveY - wandY, 2));

  var cos = (moveX - wandX) / s;
  var sin = (moveY - wandY) / s;

  var hedgehod = new Hedgehog();
  hedgehod.x = laserX;
  hedgehod.y = laserY;
  hedgehod.cos = cos;
  hedgehod.sin = sin;
  hedgehogs.push(hedgehod);
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

ImageLoader.all([
  Game.potter, Game.hedgehog1, Game.hedgehog2,
  Game.flyingHedgehog, Game.apple
])
.then((result) => {
  wandX = Game.width / 2 + wandXRelativeToPotter;
  wandY = Game.height - Game.potter.img.height / 2 + wandYRelativeToPotter;

  potterX = Game.width / 2;
  potterY = Game.height - Game.potter.height / 2;

  randomApples();

  window.requestAnimationFrame(gameLoop);
});

var oldTime = 0;

var laserX, laserY;
var potterX, potterY;

function gameLoop(time) {
  Game.timeInMilliseconds = time;
  Game.timeInSeconds = Game.timeInMilliseconds / 1000;
  Game.timeDiffInMilliseconds = time - oldTime;
  Game.timeDiffInSeconds = Game.timeDiffInMilliseconds / 1000;

  ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
  ctx.clearRect(0, 0, Game.width, Game.height);

  ctx.save();
  ctx.translate(potterX, potterY);
  ctx.drawImage(Game.potter.offsetCanvas, Game.potter.drawingX, Game.potter.drawingY);
  ctx.restore();

  var laserLength = 100;

  function drawLaser() {
    var s = Math.sqrt(Math.pow(moveX - wandX, 2) + Math.pow(moveY - wandY, 2));

    var cos = (moveX - wandX) / s;
    var sin = (moveY - wandY) / s;

    laserX = cos * laserLength + wandX;
    laserY = sin * laserLength + wandY;

    Game.laserX = laserX;
    Game.laserY = laserY;

    ctx.lineWidth = borderLineWidth;
    ctx.strokeStyle = borderColor;

    ctx.beginPath();
    ctx.moveTo(wandX, wandY);
    ctx.lineTo(laserX, laserY);
    ctx.stroke();
  }
  drawLaser();

  hedgehogs.forEach((hedgehog) => {
    checkAppleIsTaken(hedgehog);

    hedgehog.move();
    hedgehog.draw();
  });

  apples.forEach((apple) => {
    apple.draw();
  });

  oldTime = time;
  window.requestAnimationFrame(gameLoop);
}

function checkAppleIsTaken(hedgehog: Hedgehog) {
  apples.every((apple, index) => {
    if(!hedgehog.hasApple() && !apple.hasHedgehog()) {
      var diff = Math.sqrt(Math.pow(apple.x - hedgehog.x, 2) + Math.pow(apple.y - hedgehog.y, 2));

      if(diff < Game.apple.img.width / 8 + Game.flyingHedgehog.img.width / 8) {
        hedgehog.apple = apple;
        hedgehog.isFallingDown = true;
        apple.hedgehog = hedgehog;
        return false;
      }
    }

    return true;
  });
}

var apples = new Array<Apple>();

function randomApples(): void {
  while(apples.length < 10) {
    var randomX = Math.random() * (Game.width - Game.apple.width) + Game.apple.width / 2;
    var randomY = Math.random() * Game.height / 3 + Game.apple.height / 2;

    var apple = new Apple();
    apple.x = randomX;
    apple.y = randomY;

    var isTooClose = false;
    for(var i = 0; i < apples.length; i++) {
      var a = apples[i];
      var distance = Math.sqrt(Math.pow(a.x - apple.x, 2) + Math.pow(a.y - apple.y, 2));

      if(distance < 2 * Game.apple.width) {
        isTooClose = true;
        break;
      }
    }
    if(!isTooClose)
      apples.push(apple);
  }
}

var stats = new Stats();
stats.setMode(0);

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

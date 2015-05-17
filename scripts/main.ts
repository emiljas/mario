import Promise = require("bluebird");
import _ = require("underscore");

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

var images = [
  "assets/potter.png",
  "assets/hedgehog1.png",
  "assets/hedgehog2.png",
  "assets/flyingHedgehog.png"
];

var imagesPromises = _.map(images, (url) => {
  return gettingImage(url);
});

var potter: HTMLImageElement;
var hedgehog1: HTMLImageElement;
var hedgehog2: HTMLImageElement;

var moveX = 0, moveY = 0;

function handleMove(e) {
  e.preventDefault();
  moveX = e.offsetX;
  moveY = e.offsetY;
}

var hedgehogs = []

function handleUp() {
  hedgehogs.push({
    x: moveX,
    y: moveY
  });
}

canvas.addEventListener("touchmove", handleMove, false);
canvas.addEventListener("mousemove", handleMove, false);
canvas.addEventListener("mouseup", handleUp, false);

var x = 800, y = 300;
Promise.all(imagesPromises).then((result) => {
  potter = result[0];
  hedgehog1 = result[1];
  hedgehog2 = result[2];

  var i = 0;
  var oldTime = 0;

  window.requestAnimationFrame(gameLoop);

  function gameLoop(time) {
    var timeDiff = time - oldTime;

    ctx.clearRect(0, 0, width, height);

    function drawBorder() {
      var margin = 2.5;
      var lineWidth = 5;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = "red";
      ctx.moveTo(0 + margin, 0 + margin);
      ctx.lineTo(width - margin, 0 + margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(0 + margin, height - margin);
      ctx.lineTo(0 + margin, 0 + margin - lineWidth / 2);
      ctx.stroke();
    }
    drawBorder();

    ctx.drawImage(potter, (width - potter.width) / 2, height - potter.height);

    var wandXRelativeToPotter = -33;
    var wandYRelativeToPotter = -5;
    var wandX = width / 2 + wandXRelativeToPotter;
    var wandY = height - potter.height / 2 + wandYRelativeToPotter;

    var laserLength = 100;

    function drawLaser() {
      var s = Math.sqrt(Math.pow(moveX - wandX, 2) + Math.pow(moveY - wandY, 2));

      var cos = Math.abs(moveX - wandX) / s;
      var sin = Math.abs(moveY - wandY) / s;

      var laserX, laserY;

      if(moveX > wandX) {
        if(moveY > wandY) {
          //right bottom
          laserX = cos * laserLength + wandX;
          laserY = sin * laserLength + wandY;
        }
        else {
          //right top
          laserX = cos * laserLength + wandX;
          laserY = -sin * laserLength + wandY;
        }
      }
      else {
        if(moveY > wandY) {
          laserX = -cos * laserLength + wandX;
          laserY = sin * laserLength + wandY;
        }
        else {
          laserX = -cos * laserLength + wandX;
          laserY = -sin * laserLength + wandY;
        }
      }

      ctx.beginPath();
      ctx.moveTo(wandX, wandY);
      ctx.lineTo(laserX, laserY);
      ctx.stroke();
    }
    drawLaser();


    



    x -= 3;
    if(Math.floor(time / 250) % 2)
      ctx.drawImage(hedgehog1, x, y, hedgehog1.width / 4, hedgehog2.height / 4);
    else
      ctx.drawImage(hedgehog2, x, y, hedgehog1.width / 4, hedgehog2.height / 4);

    i++;
    oldTime = time;
    window.requestAnimationFrame(gameLoop);
  }
});

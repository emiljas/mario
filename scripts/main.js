/// </// <reference path="../typings/Stats.d.ts"/>
define(["require", "exports", "Stats", "./ImageLoader", "./Apple", "./Hedgehog"], function (require, exports, Stats, ImageLoader, Apple, Hedgehog) {
    window.onerror = function (e) {
        alert(e);
    };
    var $ = document.querySelector.bind(document);
    var canvas = $("#canvas");
    var ctx = canvas.getContext("2d");
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    var moveX = 0, moveY = 0;
    function handleMove(e) {
        e.preventDefault();
        moveX = e.clientX;
        moveY = e.clientY;
    }
    var hedgehogs = new Array();
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
    var potter = new ImageLoader("assets/potter.png");
    var hedgehog1 = new ImageLoader("assets/hedgehog1.png");
    var hedgehog2 = new ImageLoader("assets/hedgehog2.png");
    var flyingHedgehog = new ImageLoader("assets/flyingHedgehog.png");
    var apple = new ImageLoader("assets/apple.png");
    ImageLoader.all([
        potter, hedgehog1, hedgehog2,
        flyingHedgehog, apple
    ])
        .then(function (result) {
        wandX = width / 2 + wandXRelativeToPotter;
        wandY = height - potter.img.height / 2 + wandYRelativeToPotter;
        randomApples();
        window.requestAnimationFrame(gameLoop);
    });
    var oldTime = 0;
    var laserX, laserY;
    function gameLoop(time) {
        var timeDiff = time - oldTime;
        var timeDiffInSeconds = timeDiff / 1000;
        ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(potter.img, (width - potter.img.width) / 2, height - potter.img.height);
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
        hedgehogs.forEach(function (hedgehog) {
            checkAppleIsTaken(hedgehog);
            var hs = flyingHedgehog;
            if (hedgehog.hasApple()) {
                if (hedgehog.y < height - hedgehog1.img.height / 4) {
                    hedgehog.y += 9;
                    hedgehog.apple.y += 9;
                }
                else {
                    if (Math.floor(time / 200) % 2) {
                        hs = hedgehog1;
                    }
                    else {
                        hs = hedgehog2;
                    }
                    hedgehog.x -= 3;
                    hedgehog.apple.x -= 3;
                }
            }
            else {
                var v = 300;
                var rotateRatio = 50;
                var hedgehogFromWand = v * timeDiffInSeconds;
                var hedgehogX = hedgehog.cos * hedgehogFromWand + hedgehog.x;
                var headgehogY = hedgehog.sin * hedgehogFromWand + hedgehog.y;
                hedgehog.x = hedgehogX;
                hedgehog.y = headgehogY;
            }
            ctx.save();
            ctx.translate(hedgehog.x, hedgehog.y);
            ctx.rotate(time / rotateRatio);
            ctx.drawImage(hs.img, -hs.img.width / 8, -hs.img.height / 8, hs.img.width / 4, hs.img.height / 4);
            ctx.restore();
        });
        drawApples();
        oldTime = time;
        window.requestAnimationFrame(gameLoop);
    }
    function checkAppleIsTaken(hedgehog) {
        apples.every(function (a, index) {
            if (!a.hasHedgehog()) {
                var diff = Math.sqrt(Math.pow(a.x - hedgehog.x, 2) + Math.pow(a.y - hedgehog.y, 2));
                if (diff < apple.img.width / 8 + flyingHedgehog.img.width / 8) {
                    hedgehog.apple = a;
                    a.hedgehog = hedgehog;
                    return false;
                }
            }
            return true;
        });
    }
    var apples = new Array();
    function randomApples() {
        for (var i = 0; i < 10; i++) {
            var randomX = Math.random() * width;
            var randomY = Math.random() * height / 3;
            var apple = new Apple();
            apple.x = randomX;
            apple.y = randomY;
            apples.push(apple);
        }
    }
    function drawApples() {
        apples.forEach(function (a) {
            ctx.save();
            ctx.translate(a.x, a.y);
            ctx.drawImage(apple.img, -apple.img.width / 8, -apple.img.height / 8, apple.img.width / 4, apple.img.height / 4);
            ctx.restore();
        });
    }
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    var update = function () {
        stats.begin();
        stats.end();
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
});

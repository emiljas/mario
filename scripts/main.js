define(["require", "exports", "Stats", "./Game", "./ImageLoader", "./Apple", "./Hedgehog"], function (require, exports, Stats, Game, ImageLoader, Apple, Hedgehog) {
    window.onerror = function (e) {
        alert(e);
    };
    var $ = document.querySelector.bind(document);
    var canvas = $("#canvas");
    var ctx = canvas.getContext("2d");
    Game.ctx = ctx;
    var width = window.innerWidth;
    var height = window.innerHeight;
    Game.width = width;
    Game.height = height;
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
    ImageLoader.all([
        Game.potter, Game.hedgehog1, Game.hedgehog2,
        Game.flyingHedgehog, Game.apple
    ])
        .then(function (result) {
        wandX = width / 2 + wandXRelativeToPotter;
        wandY = height - Game.potter.img.height / 2 + wandYRelativeToPotter;
        randomApples();
        window.requestAnimationFrame(gameLoop);
    });
    var oldTime = 0;
    var laserX, laserY;
    function gameLoop(time) {
        Game.time = time;
        var timeDiff = time - oldTime;
        var timeDiffInSeconds = timeDiff / 1000;
        Game.timeDiffInSeconds = timeDiffInSeconds;
        ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(Game.potter.img, (width - Game.potter.img.width) / 2, height - Game.potter.img.height);
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
        hedgehogs.forEach(function (hedgehog) {
            checkAppleIsTaken(hedgehog);
            hedgehog.move();
            hedgehog.draw();
        });
        apples.forEach(function (apple) {
            apple.draw();
        });
        oldTime = time;
        window.requestAnimationFrame(gameLoop);
    }
    function checkAppleIsTaken(hedgehog) {
        apples.every(function (apple, index) {
            if (!hedgehog.hasApple() && !apple.hasHedgehog()) {
                var diff = Math.sqrt(Math.pow(apple.x - hedgehog.x, 2) + Math.pow(apple.y - hedgehog.y, 2));
                if (diff < Game.apple.img.width / 8 + Game.flyingHedgehog.img.width / 8) {
                    hedgehog.apple = apple;
                    apple.hedgehog = hedgehog;
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

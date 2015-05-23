define(["require", "exports", "Stats", "./Game", "./ScaleType", "./ImageLoader", "./Apple", "./Hedgehog"], function (require, exports, Stats, Game, ScaleType, ImageLoader, Apple, Hedgehog) {
    window.onerror = function (e) {
        alert(e);
    };
    var $ = document.querySelector.bind(document);
    var canvas = $("#canvas");
    var ctx = canvas.getContext("2d");
    Game.ctx = ctx;
    Game.width = window.innerWidth;
    Game.height = window.innerHeight;
    Game.potter = ImageLoader.load("assets/potter.png", 0.3, ScaleType.ToHeight);
    Game.hedgehog1 = ImageLoader.load("assets/hedgehog1.png", 0.1, ScaleType.ToWidth);
    Game.hedgehog2 = ImageLoader.load("assets/hedgehog2.png", 0.1, ScaleType.ToWidth);
    Game.flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png", 0.1, ScaleType.ToWidth);
    Game.apple = ImageLoader.load("assets/apple.png", 0.1, ScaleType.ToWidth);
    canvas.width = Game.width;
    canvas.height = Game.height;
    var moveX = 0, moveY = 0;
    function handleMove(e) {
        e.preventDefault();
        moveX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        moveY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
    }
    var hedgehogs = new Array();
    function handleUp(e) {
        handleMove(e);
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
    function areTouchEventsSupported() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e) {
            return false;
        }
    }
    if (areTouchEventsSupported()) {
        canvas.addEventListener("touchmove", handleMove, true);
        canvas.addEventListener("touchend", handleUp, true);
    }
    else {
        canvas.addEventListener("mousemove", handleMove, true);
        canvas.addEventListener("mouseup", handleUp, true);
    }
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
        console.log(Game.potter.scaleRatio);
        wandX = Game.width / 2 + wandXRelativeToPotter * Game.potter.scaleRatio;
        wandY = Game.height - Game.potter.height / 2 + wandYRelativeToPotter * Game.potter.scaleRatio;
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
        var laserLength = Game.potter.height * 0.75;
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
                if (diff < Game.apple.width / 2 + Game.flyingHedgehog.width / 2) {
                    hedgehog.apple = apple;
                    hedgehog.isFallingDown = true;
                    apple.hedgehog = hedgehog;
                    return false;
                }
            }
            return true;
        });
    }
    var apples = new Array();
    function randomApples() {
        var limit = 1000;
        var randomAttempts = 0;
        while (apples.length < 100) {
            var randomX = Math.random() * (Game.width - Game.apple.width) + Game.apple.width / 2;
            var randomY = Math.random() * Game.height / 2 + Game.apple.height / 2;
            var apple = new Apple();
            apple.x = randomX;
            apple.y = randomY;
            var isTooClose = false;
            for (var i = 0; i < apples.length; i++) {
                var a = apples[i];
                var distance = Math.sqrt(Math.pow(a.x - apple.x, 2) + Math.pow(a.y - apple.y, 2));
                if (distance < 2 * Game.apple.width) {
                    isTooClose = true;
                    break;
                }
            }
            if (!isTooClose)
                apples.push(apple);
            if (randomAttempts > limit)
                break;
            randomAttempts++;
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

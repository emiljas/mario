define(["require", "exports", "./Game", "./Apple", "./Hedgehog", "./Potter", "./Wand", "./loadAssets"], function (require, exports, Game, Apple, Hedgehog, Potter, Wand, loadAssets) {
    window.onerror = function (e, f, c) {
        alert(e + " " + f + " " + c);
    };
    var $ = document.querySelector.bind(document);
    var canvas = $("#canvas");
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
        canvas.addEventListener("touchstart", handleMove, false);
        canvas.addEventListener("touchmove", handleMove, false);
        canvas.addEventListener("touchend", handleUp, false);
    }
    else {
        canvas.addEventListener("mousemove", handleMove, false);
        canvas.addEventListener("mouseup", handleUp, false);
    }
    Game.ctx = canvas.getContext("2d");
    Game.width = window.innerWidth;
    Game.height = window.innerHeight;
    canvas.width = Game.width;
    canvas.height = Game.height;
    var potter, wand;
    loadAssets().then(function () {
        potter = new Potter();
        wand = new Wand();
        randomApples();
        window.requestAnimationFrame(gameLoop);
    });
    Game.moveX = 0;
    Game.moveY = 0;
    function handleMove(e) {
        e.preventDefault();
        Game.moveX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        Game.moveY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);
    }
    var hedgehogs = new Array();
    function handleUp(e) {
        handleMove(e);
        var s = Math.sqrt(Math.pow(Game.moveX - wand.x, 2) + Math.pow(Game.moveY - wand.y, 2));
        var cos = (Game.moveX - wand.x) / s;
        var sin = (Game.moveY - wand.y) / s;
        var hedgehod = new Hedgehog();
        hedgehod.x = laserX;
        hedgehod.y = laserY;
        hedgehod.cos = cos;
        hedgehod.sin = sin;
        hedgehogs.push(hedgehod);
        Game.assets.wandSound.play();
    }
    var oldTime = 0;
    var laserX, laserY;
    var potterX, potterY;
    function gameLoop(time) {
        Game.timeInMilliseconds = time;
        Game.timeInSeconds = Game.timeInMilliseconds / 1000;
        Game.timeDiffInMilliseconds = time - oldTime;
        Game.timeDiffInSeconds = Game.timeDiffInMilliseconds / 1000;
        Game.ctx.fillStyle = "rgba(255, 255, 255, 0.0)";
        Game.ctx.clearRect(0, 0, Game.width, Game.height);
        potter.draw();
        wand.drawLaser();
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
                if (diff < Game.assets.appleSprite.width / 2 + Game.assets.flyingHedgehogSprite.width / 2) {
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
        var limit = 100;
        var randomAttempts = 0;
        while (apples.length < 50) {
            var randomX = Math.random() * (Game.width - Game.assets.appleSprite.width) + Game.assets.appleSprite.width / 2;
            var randomY = Math.random() * Game.height / 2.5 + Game.assets.appleSprite.height / 2;
            var apple = new Apple();
            apple.x = randomX;
            apple.y = randomY;
            var isTooClose = false;
            for (var i = 0; i < apples.length; i++) {
                var a = apples[i];
                var distance = Math.sqrt(Math.pow(a.x - apple.x, 2) + Math.pow(a.y - apple.y, 2));
                if (distance < 2 * Game.assets.appleSprite.width) {
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
});

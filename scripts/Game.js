define(["require", "exports", "./ImageLoader"], function (require, exports, ImageLoader) {
    var Game = (function () {
        function Game() {
        }
        Game.potter = ImageLoader.load("assets/potter.png", 1);
        Game.hedgehog1 = ImageLoader.load("assets/hedgehog1.png", 0.25);
        Game.hedgehog2 = ImageLoader.load("assets/hedgehog2.png", 0.25);
        Game.flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png", 0.25);
        Game.apple = ImageLoader.load("assets/apple.png", 0.25);
        return Game;
    })();
    return Game;
});

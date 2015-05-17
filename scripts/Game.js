define(["require", "exports", "./ImageLoader"], function (require, exports, ImageLoader) {
    var Game = (function () {
        function Game() {
        }
        Game.potter = ImageLoader.load("assets/potter.png");
        Game.hedgehog1 = ImageLoader.load("assets/hedgehog1.png");
        Game.hedgehog2 = ImageLoader.load("assets/hedgehog2.png");
        Game.flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png");
        Game.apple = ImageLoader.load("assets/apple.png");
        return Game;
    })();
    return Game;
});

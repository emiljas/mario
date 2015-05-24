define(["require", "exports", "./Assets"], function (require, exports, Assets) {
    var Game = (function () {
        function Game() {
        }
        Game.assets = new Assets();
        return Game;
    })();
    return Game;
});

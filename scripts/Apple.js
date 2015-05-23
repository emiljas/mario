define(["require", "exports", "./Game"], function (require, exports, Game) {
    var Apple = (function () {
        function Apple() {
        }
        Apple.prototype.hasHedgehog = function () {
            return "hedgehog" in this;
        };
        Apple.prototype.draw = function () {
            Game.ctx.save();
            Game.ctx.translate(this.x, this.y);
            Game.ctx.drawImage(Game.apple.offsetCanvas, Game.apple.drawingX, Game.apple.drawingY);
            Game.ctx.restore();
        };
        return Apple;
    })();
    return Apple;
});

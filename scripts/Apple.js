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
            var sprite = Game.assets.appleSprite;
            Game.ctx.drawImage(sprite.offsetCanvas, sprite.drawingX, sprite.drawingY);
            Game.ctx.restore();
        };
        return Apple;
    })();
    return Apple;
});

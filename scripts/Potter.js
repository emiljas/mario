define(["require", "exports", "./Game"], function (require, exports, Game) {
    var Potter = (function () {
        function Potter() {
            this.x = Game.width / 2;
            this.y = Game.height - Game.assets.potterSprite.height / 2;
        }
        Potter.prototype.draw = function () {
            Game.ctx.save();
            Game.ctx.translate(this.x, this.y);
            Game.ctx.drawImage(Game.assets.potterSprite.offsetCanvas, Game.assets.potterSprite.drawingX, Game.assets.potterSprite.drawingY);
            Game.ctx.restore();
        };
        return Potter;
    })();
    return Potter;
});

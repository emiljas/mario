define(["require", "exports", "./Game"], function (require, exports, Game) {
    var Apple = (function () {
        function Apple() {
            this.ctx = Game.ctx;
        }
        Apple.prototype.hasHedgehog = function () {
            return this.hedgehog ? true : false;
        };
        Apple.prototype.draw = function () {
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            this.ctx.drawImage(Game.apple.img, -Game.apple.img.width / 8, -Game.apple.img.height / 8, Game.apple.img.width / 4, Game.apple.img.height / 4);
            this.ctx.restore();
        };
        return Apple;
    })();
    return Apple;
});

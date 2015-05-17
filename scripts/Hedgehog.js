define(["require", "exports", "./Game"], function (require, exports, Game) {
    var Hedgehog = (function () {
        function Hedgehog() {
            this.ctx = Game.ctx;
            this.sprite = Game.flyingHedgehog;
        }
        Hedgehog.prototype.hasApple = function () {
            return this.apple ? true : false;
        };
        Hedgehog.prototype.move = function () {
            if (this.hasApple()) {
                if (this.y < Game.height - Game.hedgehog1.img.height / 4) {
                    this.y += 9;
                    this.apple.y += 9;
                }
                else {
                    if (Math.floor(Game.time / 200) % 2) {
                        this.sprite = Game.hedgehog1;
                    }
                    else {
                        this.sprite = Game.hedgehog2;
                    }
                    this.x -= 3;
                    this.apple.x -= 3;
                }
            }
            else {
                var v = 300;
                var hedgehogFromWand = v * Game.timeDiffInSeconds;
                var hedgehogX = this.cos * hedgehogFromWand + this.x;
                var headgehogY = this.sin * hedgehogFromWand + this.y;
                this.x = hedgehogX;
                this.y = headgehogY;
            }
        };
        Hedgehog.prototype.draw = function () {
            var rotateRatio = 50;
            this.ctx.save();
            this.ctx.translate(this.x, this.y);
            if (!this.hasApple())
                this.ctx.rotate(Game.time / rotateRatio);
            this.ctx.drawImage(this.sprite.img, -this.sprite.img.width / 8, -this.sprite.img.height / 8, this.sprite.img.width / 4, this.sprite.img.height / 4);
            this.ctx.restore();
        };
        return Hedgehog;
    })();
    return Hedgehog;
});

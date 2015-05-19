define(["require", "exports", "./Game"], function (require, exports, Game) {
    var Hedgehog = (function () {
        function Hedgehog() {
            this.ctx = Game.ctx;
            this.sprite = Game.flyingHedgehog;
            this.time = 0;
            this.x0 = Game.laserX;
            this.y0 = Game.laserY;
        }
        Hedgehog.prototype.hasApple = function () {
            return this.apple ? true : false;
        };
        Hedgehog.prototype.move = function () {
            this.time += Game.timeDiffInSeconds;
            if (this.hasApple()) {
                if (this.y < Game.height - Game.hedgehog1.img.height / 4) {
                    var verticalMove = Hedgehog.verticalV * Game.timeDiffInSeconds;
                    this.y += verticalMove;
                    this.apple.y += verticalMove;
                }
                else {
                    if (Math.floor(Game.time / 200) % 2) {
                        this.sprite = Game.hedgehog1;
                    }
                    else {
                        this.sprite = Game.hedgehog2;
                    }
                    var horizontalMove = Hedgehog.horizontalV * Game.timeDiffInSeconds;
                    this.x -= horizontalMove;
                    this.apple.x -= horizontalMove;
                }
            }
            else {
                var v = 1050;
                var hedgehogFromWand = v * Game.timeDiffInSeconds;
                var hedgehogX = this.x0 + v * this.time * this.cos;
                var hedgehogY = this.y0 + v * this.time * this.sin + 400 * Math.pow(this.time, 2);
                this.x = hedgehogX;
                this.y = hedgehogY;
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
        Hedgehog.verticalV = 200;
        Hedgehog.horizontalV = 150;
        return Hedgehog;
    })();
    return Hedgehog;
});

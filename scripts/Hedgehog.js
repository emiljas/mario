define(["require", "exports", "./Game", "./PeriodExecutor"], function (require, exports, Game, PeriodExecutor) {
    var Hedgehog = (function () {
        function Hedgehog() {
            var _this = this;
            this.ctx = Game.ctx;
            this.sprite = Game.flyingHedgehog;
            this.time = 0;
            this.x0 = Game.laserX;
            this.y0 = Game.laserY;
            this.isFallingDown = false;
            this.currentGravityRotation = 0;
            this.walking = new PeriodExecutor(200, function () {
                _this.sprite = Game.hedgehog1;
            }, function () {
                _this.sprite = Game.hedgehog2;
            });
        }
        Hedgehog.prototype.hasApple = function () {
            return "apple" in this;
        };
        Hedgehog.prototype.move = function () {
            this.time += Game.timeDiffInSeconds;
            if (this.hasApple()) {
                if (this.isFallingDown)
                    this.isFallingDown = this.y < Game.height - 2 * Game.hedgehog1.height - 2 * Game.apple.width;
                if (this.isFallingDown) {
                    var verticalMove = Hedgehog.VerticalV * Game.timeDiffInSeconds;
                    this.y += verticalMove;
                    this.apple.y += verticalMove;
                }
                else {
                    this.x = this.apple.x;
                    this.y = this.apple.y + Game.apple.width / 2;
                    this.walking.execute(Game.timeInMilliseconds);
                    var horizontalMove = Hedgehog.HorizontalV * Game.timeDiffInSeconds;
                    this.x -= horizontalMove;
                    this.apple.x -= horizontalMove;
                }
            }
            else {
                var v = 1000;
                var hedgehogFromWand = v * Game.timeDiffInSeconds;
                var hedgehogX = this.x0 + v * this.time * this.cos;
                var hedgehogY = this.y0 + v * this.time * this.sin + 400 * Math.pow(this.time, 2);
                this.x = hedgehogX;
                this.y = hedgehogY;
            }
        };
        Hedgehog.prototype.draw = function () {
            this.ctx.save();
            if (this.isFallingDown) {
                var angleRelativeToApple = this.angleRelativeToApple();
                var angle = Game.timeDiffInSeconds * Hedgehog.GravityRotationRatio;
                if (angleRelativeToApple < 0 && this.currentGravityRotation > angleRelativeToApple) {
                    this.currentGravityRotation -= angle;
                }
                else if (angleRelativeToApple > 0 && this.currentGravityRotation < angleRelativeToApple) {
                    this.currentGravityRotation += angle;
                }
                this.ctx.translate(this.apple.x, this.apple.y);
                this.ctx.rotate(this.currentGravityRotation);
                this.ctx.translate(-this.apple.x, -this.apple.y);
            }
            this.ctx.translate(this.x, this.y);
            if (!this.hasApple()) {
                this.ctx.rotate(Game.timeInSeconds * 3 * 2 * Math.PI);
            }
            this.ctx.drawImage(this.sprite.offsetCanvas, this.sprite.drawingX, this.sprite.drawingY);
            this.ctx.restore();
        };
        Hedgehog.prototype.angleRelativeToApple = function () {
            var appleX = this.apple.x, appleY = this.apple.y;
            var hedgehogX = this.x, hedgehogY = this.y;
            hedgehogX -= appleX;
            appleX = 0;
            hedgehogY -= appleY;
            appleY = 0;
            var tan = Math.abs(hedgehogX) / Math.abs(hedgehogY);
            if (hedgehogX >= 0 && hedgehogY >= 0)
                return Math.atan(tan);
            else if (hedgehogX <= 0 && hedgehogY >= 0)
                return -Math.atan(tan);
            else if (hedgehogX >= 0 && hedgehogY <= 0)
                return Math.PI - Math.atan(tan);
            else if (hedgehogX <= 0 && hedgehogY <= 0)
                return -Math.PI + Math.atan(tan);
        };
        Hedgehog.GravityRotationRatio = 7;
        Hedgehog.VerticalV = 20;
        Hedgehog.HorizontalV = 150;
        return Hedgehog;
    })();
    return Hedgehog;
});

import Game = require("./Game");
import Apple = require("./Apple");

class Hedgehog {
  private static verticalV = 200;
  private static horizontalV = 150;

  private ctx = Game.ctx;
  private sprite = Game.flyingHedgehog;
  private time = 0;
  private x0 = Game.laserX;
  private y0 = Game.laserY;

  public x: number;
  public y: number;
  public cos: number;
  public sin: number;
  public apple: Apple;

  public hasApple(): boolean {
    return this.apple ? true : false;
  }

  public move(): void {
    this.time += Game.timeDiffInSeconds;

    if(this.hasApple()) {
      if(this.y < Game.height - Game.hedgehog1.img.height / 4) {
        var verticalMove = Hedgehog.verticalV * Game.timeDiffInSeconds;
        this.y += verticalMove;
        this.apple.y += verticalMove;
      }
      else {
        if(Math.floor(Game.time / 200) % 2) {
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
  }

  public draw(): void {
    var rotateRatio = 50;
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    if(!this.hasApple())
      this.ctx.rotate(Game.time / rotateRatio);
    this.ctx.drawImage(this.sprite.img, -this.sprite.img.width / 8, -this.sprite.img.height / 8, this.sprite.img.width / 4, this.sprite.img.height / 4);
    this.ctx.restore();
  }
}

export = Hedgehog;

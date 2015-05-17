import Game = require("./Game");
import Apple = require("./Apple");

class Hedgehog {
  private ctx = Game.ctx;
  private sprite = Game.flyingHedgehog;

  public x: number;
  public y: number;
  public cos: number;
  public sin: number;
  public apple: Apple;

  public hasApple(): boolean {
    return this.apple ? true : false;
  }

  public move(): void {
    if(this.hasApple()) {
      if(this.y < Game.height - Game.hedgehog1.img.height / 4) {
        this.y += 9;
        this.apple.y += 9;
      }
      else {
        if(Math.floor(Game.time / 200) % 2) {
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

import Game = require("./Game");
import Apple = require("./Apple");
import PeriodExecutor = require("./PeriodExecutor");

class Hedgehog {
  private static GravityRotationRatio = 7;
  private static VerticalV = 150;
  private static HorizontalV = 150;

  private ctx = Game.ctx;
  private sprite = Game.flyingHedgehog;
  private time = 0;
  private x0 = Game.laserX;
  private y0 = Game.laserY;
  public isFallingDown = false;
  private currentGravityRotation = 0;

  public x: number;
  public y: number;
  public cos: number;
  public sin: number;

  private walking = new PeriodExecutor(200
  , () => {
    this.sprite = Game.hedgehog1;
  }
  , () => {
    this.sprite = Game.hedgehog2;
  });

  public apple: Apple;
  public hasApple(): boolean {
    return "apple" in this;
  }

  public move(): void {
    this.time += Game.timeDiffInSeconds;

    if(this.hasApple()) {
      if(this.isFallingDown)
        this.isFallingDown = this.apple.y < Game.height - Game.flyingHedgehog.height - 0.5 * Game.apple.height;
      if(this.isFallingDown) {
        //falling down
        var verticalMove = Hedgehog.VerticalV * Game.timeDiffInSeconds;
        this.y += verticalMove;
        this.apple.y += verticalMove;
      }
      else {
        this.x = this.apple.x;
        this.y = this.apple.y + Game.apple.width * 0.9;

        //walk out of boards
        this.walking.execute(Game.timeInMilliseconds);

        var horizontalMove = Hedgehog.HorizontalV * Game.timeDiffInSeconds;
        this.x -= horizontalMove;
        this.apple.x -= horizontalMove;
      }
    }
    else {
      //fired
      //TODO: something wrong
      var g = 400;
      var v = Math.sqrt(Math.sqrt(2) * Game.height * 2 * g / Math.pow(this.sin, 2));

      var hedgehogFromWand = v * Game.timeDiffInSeconds;

      var hedgehogX = this.x0 + v * this.time * this.cos;
      var hedgehogY = this.y0 + v * this.time * this.sin + g * Math.pow(this.time, 2);

      this.x = hedgehogX;
      this.y = hedgehogY;
    }
  }

  public draw(): void {
    this.ctx.save();

    if(this.isFallingDown) {
      var angleRelativeToApple = this.angleRelativeToApple();
      var angle = Game.timeDiffInSeconds * Hedgehog.GravityRotationRatio;
      if(angleRelativeToApple < 0 && this.currentGravityRotation > angleRelativeToApple) {
        this.currentGravityRotation -= angle;
      }
      else if(angleRelativeToApple > 0 && this.currentGravityRotation < angleRelativeToApple) {
        this.currentGravityRotation += angle;
      }
      this.ctx.translate(this.apple.x, this.apple.y);
      this.ctx.rotate(this.currentGravityRotation);
      this.ctx.translate(-this.apple.x, -this.apple.y);
    }

    this.ctx.translate(this.x, this.y);
    if(!this.hasApple()) {
      this.ctx.rotate(Game.timeInSeconds * 3 * 2 * Math.PI);
    }
    this.ctx.drawImage(this.sprite.offsetCanvas, this.sprite.drawingX, this.sprite.drawingY);
    this.ctx.restore();
  }


  private angleRelativeToApple(): number {
    var appleX = this.apple.x, appleY = this.apple.y;
    var hedgehogX = this.x, hedgehogY = this.y;

    hedgehogX -= appleX;
    appleX = 0;

    hedgehogY -= appleY;
    appleY = 0;

    var tan = Math.abs(hedgehogX) / Math.abs(hedgehogY);
    if(hedgehogX >= 0 && hedgehogY >= 0)
      return Math.atan(tan);
    else if(hedgehogX <= 0 && hedgehogY >= 0)
      return -Math.atan(tan);
    else if(hedgehogX >= 0 && hedgehogY <= 0)
      return Math.PI - Math.atan(tan);
    else if(hedgehogX <= 0 && hedgehogY <= 0)
      return -Math.PI + Math.atan(tan);
  }
}

export = Hedgehog;

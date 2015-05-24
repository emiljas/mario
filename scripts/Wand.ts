import Game = require("./Game");

class Wand {
  public static xRelativeToPotter = -33;
  public static yRelativeToPotter = -5;

  public x: number;
  public y: number;

  constructor() {
    this.x = this.calculateX();
    this.y = this.calculateY();
  }

  private calculateX(): number {
    return Game.width / 2 +
      Wand.xRelativeToPotter * Game.assets.potterSprite.scaleRatio;
  }

  private calculateY(): number {
    return Game.height -
      Game.assets.potterSprite.height / 2 +
      Wand.yRelativeToPotter * Game.assets.potterSprite.scaleRatio;
  }

  public drawLaser(): void {
    var laserLength = Game.assets.potterSprite.height * 0.75;

    var borderMargin = 2.5;
    var borderLineWidth = 5;
    var borderColor = "red";

    var s = Math.sqrt(Math.pow(Game.moveX - this.x, 2) + Math.pow(Game.moveY - this.y, 2));

    var cos = (Game.moveX - this.x) / s;
    var sin = (Game.moveY - this.y) / s;

    Game.laserX = cos * laserLength + this.x;
    Game.laserY = sin * laserLength + this.y;

    Game.ctx.lineWidth = borderLineWidth;
    Game.ctx.strokeStyle = borderColor;

    Game.ctx.beginPath();
    Game.ctx.moveTo(this.x, this.y);
    Game.ctx.lineTo(Game.laserX, Game.laserY);
    Game.ctx.stroke();
  }
}

export = Wand;

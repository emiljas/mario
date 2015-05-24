import Game = require("./Game");
import Hedgehog = require("./Hedgehog");

class Apple {
  public x: number;
  public y: number;

  public hedgehog: Hedgehog;
  public hasHedgehog(): boolean {
    return "hedgehog" in this;
  }

  public draw(): void {
    Game.ctx.save();
    Game.ctx.translate(this.x, this.y);
    var sprite = Game.assets.appleSprite;
    Game.ctx.drawImage(sprite.offsetCanvas, sprite.drawingX, sprite.drawingY);
    Game.ctx.restore();
  }
}

export = Apple;

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
    Game.ctx.drawImage(Game.apple.offsetCanvas, Game.apple.drawingX, Game.apple.drawingY);
    Game.ctx.restore();
  }
}

export = Apple;

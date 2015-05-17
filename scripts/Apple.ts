import Game = require("./Game");
import Hedgehog = require("./Hedgehog");

class Apple {
  private ctx = Game.ctx;

  public x: number;
  public y: number;
  public hedgehog: Hedgehog;

  public hasHedgehog(): boolean {
    return this.hedgehog ? true : false;
  }

  public draw(): void {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(Game.apple.img, -Game.apple.img.width / 8, -Game.apple.img.height / 8, Game.apple.img.width / 4, Game.apple.img.height / 4);
    this.ctx.restore();
  }
}

export = Apple;

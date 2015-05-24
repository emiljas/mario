import Game = require("./Game");

class Potter {
  private x: number;
  private y: number;

  constructor() {
    this.x = Game.width / 2;
    this.y = Game.height - Game.assets.potterSprite.height / 2;
  }

  public draw(): void {
    Game.ctx.save();
    Game.ctx.translate(this.x, this.y);
    Game.ctx.drawImage(Game.assets.potterSprite.offsetCanvas, Game.assets.potterSprite.drawingX, Game.assets.potterSprite.drawingY);
    Game.ctx.restore();
  }
}

export = Potter;

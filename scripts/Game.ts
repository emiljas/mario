import ImageLoader = require("./ImageLoader");
import ScaleType = require("./ScaleType");

class Game {
  static ctx: CanvasRenderingContext2D;
  static timeInMilliseconds: number;
  static timeInSeconds: number;
  static timeDiffInMilliseconds: number;
  static timeDiffInSeconds: number;

  static width: number;
  static height: number;

  static wandX: number;
  static wandY: number;

  static laserX: number;
  static laserY: number;

  static potter: ImageLoader;
  static hedgehog1: ImageLoader;
  static hedgehog2: ImageLoader;
  static flyingHedgehog: ImageLoader;
  static apple: ImageLoader;
}

export = Game;

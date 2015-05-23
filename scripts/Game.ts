import ImageLoader = require("./ImageLoader");

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

  static potter = ImageLoader.load("assets/potter.png", 1);
  static hedgehog1 = ImageLoader.load("assets/hedgehog1.png", 0.25);
  static hedgehog2 = ImageLoader.load("assets/hedgehog2.png", 0.25);
  static flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png", 0.25);
  static apple = ImageLoader.load("assets/apple.png", 0.25);
}

export = Game;

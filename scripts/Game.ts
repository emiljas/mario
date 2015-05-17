import ImageLoader = require("./ImageLoader");

class Game {
  static ctx: CanvasRenderingContext2D;
  static time: number;
  static timeDiffInSeconds: number;

  static width: number;
  static height: number;

  static wandX: number;
  static wandY: number;

  static laserX: number;
  static laserY: number;

  static potter = ImageLoader.load("assets/potter.png");
  static hedgehog1 = ImageLoader.load("assets/hedgehog1.png");
  static hedgehog2 = ImageLoader.load("assets/hedgehog2.png");
  static flyingHedgehog = ImageLoader.load("assets/flyingHedgehog.png");
  static apple = ImageLoader.load("assets/apple.png");
}

export = Game;

import Assets = require("./Assets");

class Game {
  public static ctx: CanvasRenderingContext2D;
  public static timeInMilliseconds: number;
  public static timeInSeconds: number;
  public static timeDiffInMilliseconds: number;
  public static timeDiffInSeconds: number;

  public static width: number;
  public static height: number;

  public static moveX: number;
  public static moveY: number;

  public static wandX: number;
  public static wandY: number;

  public static laserX: number;
  public static laserY: number;

  public static assets = new Assets();
}

export = Game;

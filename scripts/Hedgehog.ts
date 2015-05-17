import Apple = require("./Apple");

class Hedgehog {
  public x: number;
  public y: number;
  public cos: number;
  public sin: number;
  public apple: Apple;

  public hasApple(): boolean {
    return this.apple ? true : false;
  }
}

export = Hedgehog;

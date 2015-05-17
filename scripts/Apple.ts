import Hedgehog = require("./Hedgehog");

class Apple {
  public x: number;
  public y: number;
  public hedgehog: Hedgehog;

  public hasHedgehog(): boolean {
    return this.hedgehog ? true : false;
  }
}

export = Apple;

import ImageLoader = require("./ImageLoader");
import ISoundLoader = require("./ISoundLoader");

class Assets {
  public potterSprite: ImageLoader;
  public hedgehog1Sprite: ImageLoader;
  public hedgehog2Sprite: ImageLoader;
  public flyingHedgehogSprite: ImageLoader;
  public appleSprite: ImageLoader;

  public wandSound: ISoundLoader;
  public hedgehogStep1Sound: ISoundLoader;
  public hedgehogStep2Sound: ISoundLoader;
}

export = Assets;

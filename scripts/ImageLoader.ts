import _ = require("underscore");
import Promise = require("bluebird");
import Game = require("./Game");
import ScaleType = require("./ScaleType");

class ImageLoader {
  public promise: Promise<HTMLImageElement>;
  public img: HTMLImageElement;
  public offsetCanvas: HTMLCanvasElement;
  public offsetCanvasCtx: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public drawingX: number;
  public drawingY: number;
  public scaleRatio: number;

  constructor(private url: string, private scale: number, private scaleType?: ScaleType) {
    this.promise = this.gettingImage();
  }

  private gettingImage(): Promise<HTMLImageElement> {
    this.offsetCanvas = document.createElement("canvas");
    this.offsetCanvasCtx = this.offsetCanvas.getContext("2d");

    return new Promise<HTMLImageElement>((resolve: (HTMLImageElement) => void) => {
      this.img = new Image();
      this.img.src = this.url;
      this.img.addEventListener("load", () => {

        this.width = this.img.width;
        this.height = this.img.height;

        if(this.scaleType == ScaleType.ToHeight) {
          var height = Math.min(Game.height * this.scale, this.height);
          var ratio = height / this.height;
          this.width *= ratio;
          this.height = height;
          this.scaleRatio = ratio;
        }
        else if(this.scaleType == ScaleType.ToWidth) {
          var width = Math.min(Game.width * this.scale, this.width);
          var ratio = width / this.width;
          this.width = width;
          this.height *= ratio;
          this.scaleRatio = ratio;
        }
        else {
          this.width = this.img.width * this.scale;
          this.height = this.img.height * this.scale;
        }

        this.offsetCanvas.width = this.width;
        this.offsetCanvas.height = this.height;
        this.offsetCanvasCtx.drawImage(this.img, 0, 0, this.width, this.height);

        this.drawingX = -this.width / 2;
        this.drawingY = -this.height / 2;

        resolve(this.img);
      }, false);
    });
  }

  public static load(url: string, scale: number, scaleType?: ScaleType) {
    return new ImageLoader(url, scale, scaleType);
  }
}

export = ImageLoader;

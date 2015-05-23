import _ = require("underscore");
import Promise = require("bluebird");

class ImageLoader {
  private promise: Promise<HTMLImageElement>;
  public img: HTMLImageElement;
  public offsetCanvas: HTMLCanvasElement;
  public offsetCanvasCtx: CanvasRenderingContext2D;
  public width: number;
  public height: number;
  public drawingX: number;
  public drawingY: number;

  constructor(private url: string, private scale: number) {
    this.promise = this.gettingImage();
  }

  private gettingImage(): Promise<HTMLImageElement> {
    this.offsetCanvas = document.createElement("canvas");
    this.offsetCanvasCtx = this.offsetCanvas.getContext("2d");

    return new Promise<HTMLImageElement>((resolve: (HTMLImageElement) => void) => {
      this.img = new Image();
      this.img.src = this.url;
      this.img.addEventListener("load", () => {
        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;
        this.offsetCanvas.width = this.width;
        this.offsetCanvas.height = this.height;
        this.offsetCanvasCtx.drawImage(this.img, 0, 0, this.width, this.height);

        this.drawingX = -this.width / 2;
        this.drawingY = -this.height / 2;

        resolve(this.img);
      }, false);
    });
  }

  public static load(url: string, scale: number) {
    return new ImageLoader(url, scale);
  }

  public static all(loaders: ImageLoader[]) {
    var promises = _.map(loaders, (loader) => {
      return loader.promise;
    })
    return Promise.all(promises);
  }
}

export = ImageLoader;

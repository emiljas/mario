import _ = require("underscore");
import Promise = require("bluebird");

class ImageLoader {
  private promise: Promise<HTMLImageElement>;
  public img: HTMLImageElement;

  constructor(private url: string) {
    this.promise = this.gettingImage();
  }

  private gettingImage(): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve: (HTMLImageElement) => void) => {
      this.img = new Image();
      this.img.src = this.url;
      this.img.addEventListener("load", () => {
        resolve(this.img);
      }, false);
    });
  }

  public static load(url: string) {
    return new ImageLoader(url);
  }

  public static all(loaders: ImageLoader[]) {
    var promises = _.map(loaders, (loader) => {
      return loader.promise;
    })
    return Promise.all(promises);
  }
}

export = ImageLoader;

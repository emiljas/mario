import Promise = require("bluebird");
import ISoundLoader = require("./ISoundLoader");

class SoundLoaderByAudioTag implements ISoundLoader {
  private static MaxParallel = 3;

  public promise: Promise<void>;
  private soundsPoolIndex = 0;
  private soundsPool = new Array<HTMLAudioElement>();

  constructor(private url: string) {
    this.promise = this.gettingAudio();
  }

  private gettingAudio(): Promise<any> {
    var promises = [];
    for(var i = 0; i < SoundLoaderByAudioTag.MaxParallel; i++)
      promises.push(this.loadingSoundToPool());

    return Promise.all(promises);
  }

  private loadingSoundToPool(): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      var sound = new Audio(this.url);
      sound.preload = "auto";
      sound.volume = 0.2;
      this.soundsPool.push(sound)

      var intervalId = setInterval(() => {
        if(sound.readyState === 4) {
          clearInterval(intervalId);
          resolve();
        }
      }, 200);
    });
  }

  public play() {
    var sound = this.soundsPool[this.soundsPoolIndex];
    sound.currentTime = 0;
    sound.play();

    this.soundsPoolIndex++;
    if(this.soundsPoolIndex > SoundLoaderByAudioTag.MaxParallel - 1)
      this.soundsPoolIndex = 0;
  }

  public static load(url: string): ISoundLoader {
    return new SoundLoaderByAudioTag(url);
  }
}

export = SoundLoaderByAudioTag;

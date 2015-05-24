import ISoundLoader = require("./ISoundLoader");
import SoundLoaderByWebAudioApi = require("./SoundLoaderByWebAudioApi");
import SoundLoaderByAudioTag = require("./SoundLoaderByAudioTag");

class SoundLoader {
  public static load(url: string): ISoundLoader {
    // if(SoundLoaderByWebAudioApi.isSupported())
    //   return SoundLoaderByWebAudioApi.load(url);
    // else
      return SoundLoaderByAudioTag.load(url);
  }
}

export = SoundLoader;

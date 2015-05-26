import ISoundLoader = require("./ISoundLoader");

class SoundLoaderByWebAudioApi implements ISoundLoader {
  private static audioContext: AudioContext;

  public static isSupported(): boolean {
    this.loadAudioContext();
    return "AudioContext" in window || "webkitAudioContext" in window || "mozAudioContext" in window;
  }

  public promise: Promise<any>;
  private buffer: AudioBuffer;

  constructor(private url: string) {
    SoundLoaderByWebAudioApi.loadAudioContext();
    this.promise = this.gettingSound();
  }

  private static loadAudioContext(): void {
    if(!SoundLoaderByWebAudioApi.audioContext) {
      if("AudioContext" in window)
        SoundLoaderByWebAudioApi.audioContext = new AudioContext();
      else if("webkitAudioContext" in window)
        SoundLoaderByWebAudioApi.audioContext = new window["webkitAudioContext"]();
      else if("mozAudioContext" in window)
        SoundLoaderByWebAudioApi.audioContext = new window["mozAudioContext"]();
    }
  }

  public gettingSound(): Promise<any> {
    return new Promise<void>((resolve: () => void) => {
      var request = new XMLHttpRequest();
      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        SoundLoaderByWebAudioApi.audioContext.decodeAudioData(request.response, (buffer) => {
          this.buffer = buffer;
          resolve();
        });
      }
      request.send();
    });
  }

  public play(): void {
    var source = SoundLoaderByWebAudioApi.audioContext.createBufferSource();
    source.buffer = this.buffer;
    source.connect(SoundLoaderByWebAudioApi.audioContext.destination);
    source.start(0);
  }

  public static load(url: string): SoundLoaderByWebAudioApi{
    return new SoundLoaderByWebAudioApi(url);
  }
}

export = SoundLoaderByWebAudioApi;

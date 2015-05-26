define(["require", "exports"], function (require, exports) {
    var SoundLoaderByWebAudioApi = (function () {
        function SoundLoaderByWebAudioApi(url) {
            this.url = url;
            SoundLoaderByWebAudioApi.loadAudioContext();
            this.promise = this.gettingSound();
        }
        SoundLoaderByWebAudioApi.isSupported = function () {
            this.loadAudioContext();
            return "AudioContext" in window || "webkitAudioContext" in window || "mozAudioContext" in window;
        };
        SoundLoaderByWebAudioApi.loadAudioContext = function () {
            if (!SoundLoaderByWebAudioApi.audioContext) {
                if ("AudioContext" in window)
                    SoundLoaderByWebAudioApi.audioContext = new AudioContext();
                else if ("webkitAudioContext" in window)
                    SoundLoaderByWebAudioApi.audioContext = new window["webkitAudioContext"]();
                else if ("mozAudioContext" in window)
                    SoundLoaderByWebAudioApi.audioContext = new window["mozAudioContext"]();
            }
        };
        SoundLoaderByWebAudioApi.prototype.gettingSound = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var request = new XMLHttpRequest();
                request.open('GET', _this.url, true);
                request.responseType = 'arraybuffer';
                request.onload = function () {
                    SoundLoaderByWebAudioApi.audioContext.decodeAudioData(request.response, function (buffer) {
                        _this.buffer = buffer;
                        resolve();
                    });
                };
                request.send();
            });
        };
        SoundLoaderByWebAudioApi.prototype.play = function () {
            var source = SoundLoaderByWebAudioApi.audioContext.createBufferSource();
            source.buffer = this.buffer;
            source.connect(SoundLoaderByWebAudioApi.audioContext.destination);
            source.start(0);
        };
        SoundLoaderByWebAudioApi.load = function (url) {
            return new SoundLoaderByWebAudioApi(url);
        };
        return SoundLoaderByWebAudioApi;
    })();
    return SoundLoaderByWebAudioApi;
});

define(["require", "exports", "bluebird"], function (require, exports, Promise) {
    var SoundLoaderByAudioTag = (function () {
        function SoundLoaderByAudioTag(url) {
            this.url = url;
            this.soundsPoolIndex = 0;
            this.soundsPool = new Array();
            this.promise = this.gettingAudio();
        }
        SoundLoaderByAudioTag.prototype.gettingAudio = function () {
            var promises = [];
            for (var i = 0; i < SoundLoaderByAudioTag.MaxParallel; i++)
                promises.push(this.loadingSoundToPool());
            return Promise.all(promises);
        };
        SoundLoaderByAudioTag.prototype.loadingSoundToPool = function () {
            var _this = this;
            return new Promise(function (resolve) {
                var sound = new Audio(_this.url);
                sound.preload = "auto";
                sound.volume = 0.2;
                _this.soundsPool.push(sound);
                var intervalId = setInterval(function () {
                    if (sound.readyState === 4) {
                        clearInterval(intervalId);
                        resolve();
                    }
                }, 200);
            });
        };
        SoundLoaderByAudioTag.prototype.play = function () {
            var sound = this.soundsPool[this.soundsPoolIndex];
            sound.currentTime = 0;
            sound.play();
            this.soundsPoolIndex++;
            if (this.soundsPoolIndex > SoundLoaderByAudioTag.MaxParallel - 1)
                this.soundsPoolIndex = 0;
        };
        SoundLoaderByAudioTag.load = function (url) {
            return new SoundLoaderByAudioTag(url);
        };
        SoundLoaderByAudioTag.MaxParallel = 3;
        return SoundLoaderByAudioTag;
    })();
    return SoundLoaderByAudioTag;
});

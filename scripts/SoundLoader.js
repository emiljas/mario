define(["require", "exports", "./SoundLoaderByWebAudioApi", "./SoundLoaderByAudioTag"], function (require, exports, SoundLoaderByWebAudioApi, SoundLoaderByAudioTag) {
    var SoundLoader = (function () {
        function SoundLoader() {
        }
        SoundLoader.load = function (url) {
            if (SoundLoaderByWebAudioApi.isSupported())
                return SoundLoaderByWebAudioApi.load(url);
            else
                return SoundLoaderByAudioTag.load(url);
        };
        return SoundLoader;
    })();
    return SoundLoader;
});

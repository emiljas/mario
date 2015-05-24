define(["require", "exports", "./SoundLoaderByAudioTag"], function (require, exports, SoundLoaderByAudioTag) {
    var SoundLoader = (function () {
        function SoundLoader() {
        }
        SoundLoader.load = function (url) {
            return SoundLoaderByAudioTag.load(url);
        };
        return SoundLoader;
    })();
    return SoundLoader;
});

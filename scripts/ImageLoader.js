define(["require", "exports", "underscore", "bluebird"], function (require, exports, _, Promise) {
    var ImageLoader = (function () {
        function ImageLoader(url) {
            this.url = url;
            this.promise = this.gettingImage();
        }
        ImageLoader.prototype.gettingImage = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.img = new Image();
                _this.img.src = _this.url;
                _this.img.addEventListener("load", function () {
                    resolve(_this.img);
                }, false);
            });
        };
        ImageLoader.load = function (url) {
            return new ImageLoader(url);
        };
        ImageLoader.all = function (loaders) {
            var promises = _.map(loaders, function (loader) {
                return loader.promise;
            });
            return Promise.all(promises);
        };
        return ImageLoader;
    })();
    return ImageLoader;
});

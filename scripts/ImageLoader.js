define(["require", "exports", "underscore", "bluebird"], function (require, exports, _, Promise) {
    var ImageLoader = (function () {
        function ImageLoader(url, scale) {
            this.url = url;
            this.scale = scale;
            this.promise = this.gettingImage();
        }
        ImageLoader.prototype.gettingImage = function () {
            var _this = this;
            this.offsetCanvas = document.createElement("canvas");
            this.offsetCanvasCtx = this.offsetCanvas.getContext("2d");
            return new Promise(function (resolve) {
                _this.img = new Image();
                _this.img.src = _this.url;
                _this.img.addEventListener("load", function () {
                    _this.width = _this.img.width * _this.scale;
                    _this.height = _this.img.height * _this.scale;
                    _this.offsetCanvas.width = _this.width;
                    _this.offsetCanvas.height = _this.height;
                    _this.offsetCanvasCtx.drawImage(_this.img, 0, 0, _this.width, _this.height);
                    _this.drawingX = -_this.width / 2;
                    _this.drawingY = -_this.height / 2;
                    resolve(_this.img);
                }, false);
            });
        };
        ImageLoader.load = function (url, scale) {
            return new ImageLoader(url, scale);
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

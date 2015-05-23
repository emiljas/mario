define(["require", "exports", "underscore", "bluebird", "./Game", "./ScaleType"], function (require, exports, _, Promise, Game, ScaleType) {
    var ImageLoader = (function () {
        function ImageLoader(url, scale, scaleType) {
            this.url = url;
            this.scale = scale;
            this.scaleType = scaleType;
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
                    _this.width = _this.img.width;
                    _this.height = _this.img.height;
                    if (_this.scaleType == ScaleType.ToHeight) {
                        var height = Math.min(Game.height * _this.scale, _this.height);
                        var ratio = height / _this.height;
                        _this.width *= ratio;
                        _this.height = height;
                        _this.scaleRatio = ratio;
                    }
                    else if (_this.scaleType == ScaleType.ToWidth) {
                        var width = Math.min(Game.width * _this.scale, _this.width);
                        var ratio = width / _this.width;
                        _this.width = width;
                        _this.height *= ratio;
                        _this.scaleRatio = ratio;
                    }
                    else {
                        _this.width = _this.img.width * _this.scale;
                        _this.height = _this.img.height * _this.scale;
                    }
                    _this.offsetCanvas.width = _this.width;
                    _this.offsetCanvas.height = _this.height;
                    _this.offsetCanvasCtx.drawImage(_this.img, 0, 0, _this.width, _this.height);
                    _this.drawingX = -_this.width / 2;
                    _this.drawingY = -_this.height / 2;
                    resolve(_this.img);
                }, false);
            });
        };
        ImageLoader.load = function (url, scale, scaleType) {
            return new ImageLoader(url, scale, scaleType);
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

define(["require", "exports"], function (require, exports) {
    var Hedgehog = (function () {
        function Hedgehog() {
        }
        Hedgehog.prototype.hasApple = function () {
            return this.apple ? true : false;
        };
        return Hedgehog;
    })();
    return Hedgehog;
});

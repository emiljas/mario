define(["require", "exports"], function (require, exports) {
    var Apple = (function () {
        function Apple() {
        }
        Apple.prototype.hasHedgehog = function () {
            return this.hedgehog ? true : false;
        };
        return Apple;
    })();
    return Apple;
});

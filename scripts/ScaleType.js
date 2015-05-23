define(["require", "exports"], function (require, exports) {
    var ScaleType;
    (function (ScaleType) {
        ScaleType[ScaleType["ToWidth"] = 0] = "ToWidth";
        ScaleType[ScaleType["ToHeight"] = 1] = "ToHeight";
    })(ScaleType || (ScaleType = {}));
    return ScaleType;
});

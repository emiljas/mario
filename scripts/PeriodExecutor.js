define(["require", "exports"], function (require, exports) {
    var PeriodExecutor = (function () {
        function PeriodExecutor(periodTimeInMilliseconds) {
            var actions = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                actions[_i - 1] = arguments[_i];
            }
            this.periodTimeInMilliseconds = periodTimeInMilliseconds;
            this.actions = actions;
            this.periodCount = this.actions.length;
        }
        PeriodExecutor.prototype.execute = function (timeInMilliseconds) {
            var currentPeriodNumber = Math.floor((timeInMilliseconds / this.periodTimeInMilliseconds) % this.periodCount);
            for (var periodNumber = 0; periodNumber < this.periodCount; periodNumber++) {
                if (currentPeriodNumber == periodNumber) {
                    this.actions[periodNumber]();
                    break;
                }
            }
        };
        return PeriodExecutor;
    })();
    return PeriodExecutor;
});

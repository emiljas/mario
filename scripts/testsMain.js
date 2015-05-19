/// <reference path="../typings/tsd.d.ts" />
define(["require", "exports", "./PeriodExecutor"], function (require, exports, PeriodExecutor) {
    var assert;
    test(0, { counter1: 1, counter2: 0, counter3: 0 });
    test(999, { counter1: 1, counter2: 0, counter3: 0 });
    test(1000, { counter1: 0, counter2: 1, counter3: 0 });
    test(1999, { counter1: 0, counter2: 1, counter3: 0 });
    test(2000, { counter1: 0, counter2: 0, counter3: 1 });
    test(2999, { counter1: 0, counter2: 0, counter3: 1 });
    test(3500, { counter1: 1, counter2: 0, counter3: 0 });
    test(4500, { counter1: 0, counter2: 1, counter3: 0 });
    test(5500, { counter1: 0, counter2: 0, counter3: 1 });
    var counter1, counter2, counter3;
    function test(time, expected) {
        QUnit.test("test", function (_assert) {
            assert = _assert;
            counter1 = counter2 = counter3 = 0;
            var executor = new PeriodExecutor(1000, function () {
                counter1++;
            }, function () {
                counter2++;
            }, function () {
                counter3++;
            });
            executor.execute(time);
            assertCounters(expected.counter1, expected.counter2, expected.counter3);
        });
    }
    function assertCounters(expectedCounter1, expectedCounter2, expectedCounter3) {
        assert.strictEqual(counter1, expectedCounter1);
        assert.strictEqual(counter2, expectedCounter2);
        assert.strictEqual(counter3, expectedCounter3);
    }
});

/// <reference path="../typings/tsd.d.ts" />

import PeriodExecutor = require("./PeriodExecutor");
import rad2deg = require("./rad2deg");
import deg2rad = require("./deg2rad");

var assert: QUnitAssert;

test(   0, { counter1: 1, counter2: 0, counter3: 0 });
test( 999, { counter1: 1, counter2: 0, counter3: 0 });
test(1000, { counter1: 0, counter2: 1, counter3: 0 });
test(1999, { counter1: 0, counter2: 1, counter3: 0 });
test(2000, { counter1: 0, counter2: 0, counter3: 1 });
test(2999, { counter1: 0, counter2: 0, counter3: 1 });
test(3500, { counter1: 1, counter2: 0, counter3: 0 });
test(4500, { counter1: 0, counter2: 1, counter3: 0 });
test(5500, { counter1: 0, counter2: 0, counter3: 1 });


var counter1, counter2, counter3;

function test(time, expected) {
  QUnit.test("test", (_assert) => {
    assert = _assert;
    counter1 = counter2 = counter3 = 0;

    var executor = new PeriodExecutor(1000
    , () => {
      counter1++;
    }
    , () => {
      counter2++;
    }
    , () => {
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






function angle(appleX, appleY, hedgehogX, hedgehogY) {
  var tan = Math.abs(hedgehogX) / Math.abs(hedgehogY);
  if(hedgehogX >= 0 && hedgehogY >= 0)
    return Math.atan(tan);
  else if(hedgehogX <= 0 && hedgehogY >= 0)
    return -Math.atan(tan);
  else if(hedgehogX >= 0 && hedgehogY <= 0)
    return Math.PI - Math.atan(tan);
  else if(hedgehogX <= 0 && hedgehogY <= 0)
    return -Math.PI + Math.atan(tan);

  // var tan = hedgehogX / hedgehogY;
  // if(hedgehogX < 0 && hedgehogY < 0)
  //   return Math.PI / 2 + Math.atan(tan);
  //   // return -(Math.PI / 2 + Math.atan(tan));
  // else if(hedgehogY < 0)
  //   return Math.PI + Math.atan(tan);
  // return Math.atan(tan);
}

testAngle("90", 0, 0, 1, 0, 90);
testAngle("45", 0, 0, 1, 1, 45);
testAngleInRange("10-30", 0, 0, 1, 2, 20, 30);

testAngle("-90", 0, 0, -1, 0, -90);
testAngle("-45", 0, 0, -1, 1, -45);
testAngleInRange("-30-(-20)", 0, 0, -1, 2, -30, -20);

testAngle("180", 0, 0, 0, -1, 180);
testAngle("135", 0, 0, 1, -1, 135);
testAngleInRange("115-145", 0, 0, 1, -2, 145, 170);

testAngle("-135", 0, 0, -1, -1, -135);
testAngleInRange("(-170)-(-145)", 0, 0, -1, -2, -170, -145);


function testAngle(message, appleX, appleY, hedgehogX, hedgehogY, expectedDeg) {
  QUnit.test(message, (assert) => {
    var rad = angle(appleX, appleY, hedgehogX, hedgehogY);
    assert.strictEqual(rad2deg(rad), expectedDeg);
  });
}

function testAngleInRange(message, appleX, appleY, hedgehogX, hedgehogY, expectedDegMin, expectedDegMax) {
  QUnit.test(message, (assert) => {
    var rad = angle(appleX, appleY, hedgehogX, hedgehogY);
    assert.ok(rad2deg(rad) >= expectedDegMin && rad2deg(rad) <= expectedDegMax);
  });
}

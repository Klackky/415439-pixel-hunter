import {assert} from 'chai';
import createTimer from '../utils/timer';
describe(`Check if timer works correctly`, () => {

  it(`should check if tick returns time decreased by one second`, () => {
    assert.equal(createTimer(5).tick().countdown, 4);
    assert.equal(createTimer(5).tick(2).countdown, 3);
    assert.equal(createTimer(10).tick(2).countdown, 8);
    assert.equal(createTimer(10).tick(5).countdown, 5);
  });

  it(`should check if time is over`, () => {
    const timer = createTimer(0);
    assert.equal(timer.tick().countdown, 0);
  });

  it(`time can not be negative`, () => {
    const timer = createTimer(-1);
    assert.equal(timer.tick().countdown, 0);
  });
});

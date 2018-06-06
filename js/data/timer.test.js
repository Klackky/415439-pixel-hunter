import {assert} from 'chai';
import createTimer from '../utils/timer';
describe(`Check if timer works correctly`, () => {

  it(`should check if tick returns time decreased by one second`, () => {
    const timer = createTimer(5);
    assert.equal(timer.tick().countdown, 4);
    assert.equal(timer.tick().tick().countdown, 3);
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

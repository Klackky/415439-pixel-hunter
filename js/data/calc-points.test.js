import {assert} from 'chai';
import calcPoints from '../utils/calc-points';
const randomAnswers = [
  {
    answer: true,
    time: 15
  },
  {
    answer: true,
    time: 27
  },
  {
    answer: true,
    time: 29
  },
  {
    answer: true,
    time: 8
  },
  {
    answer: true,
    time: 11
  },
  {
    answer: true,
    time: 8
  },
  {
    answer: true,
    time: 15
  },
  {
    answer: true,
    time: 11
  },
  {
    answer: true,
    time: 7
  },
  {
    answer: true,
    time: 25
  }
];
const negativeResult = [
  {
    answer: true,
    time: 10
  },
  {
    answer: true,
    time: 7
  },
  {
    answer: true,
    time: 20
  },
  {
    answer: false,
    time: 20
  },
  {
    answer: true,
    time: 10
  },
  {
    answer: false,
    time: 30
  },
  {
    answer: false,
    time: 20
  },
  {
    answer: true,
    time: 20
  },
  {
    answer: false,
    time: 10
  },
  {
    answer: false,
    time: 30
  }
];
const allCorrectAndQuickAnswers = [
  {
    answer: true,
    time: 8
  },
  {
    answer: true,
    time: 7
  },
  {
    answer: true,
    time: 9
  },
  {
    answer: true,
    time: 5
  },
  {
    answer: true,
    time: 8
  },
  {
    answer: true,
    time: 9
  },
  {
    answer: true,
    time: 7
  },
  {
    answer: true,
    time: 8
  },
  {
    answer: true,
    time: 9
  },
  {
    answer: true,
    time: 9
  }
];
const allCorrectAndSlowAnswers = [
  {
    answer: true,
    time: 24
  },
  {
    answer: true,
    time: 27
  },
  {
    answer: true,
    time: 24
  },
  {
    answer: true,
    time: 23
  },
  {
    answer: true,
    time: 28
  },
  {
    answer: true,
    time: 29
  },
  {
    answer: true,
    time: 27
  },
  {
    answer: true,
    time: 28
  },
  {
    answer: true,
    time: 29
  },
  {
    answer: true,
    time: 29
  }
];
describe(`Check if player points calculated correctly`, () => {

  it(`should calculate points correctly`, () => {
    assert.equal(calcPoints(negativeResult, 0), -1);
    assert.equal(calcPoints(randomAnswers, 3), 1150);
    assert.equal(calcPoints(randomAnswers, 1), 1050);
    assert.equal(calcPoints(allCorrectAndQuickAnswers, 1), 1550);
    assert.equal(calcPoints(allCorrectAndSlowAnswers, 3), 650);
  });

});

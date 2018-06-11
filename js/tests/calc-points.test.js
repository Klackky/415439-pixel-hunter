import {assert} from 'chai';
import calculatePoints from '../utils/calc-points';
const correctNormalAnswer = {
  isCorrect: true,
  time: 15
};
const correctFastAnswer = {
  isCorrect: true,
  time: 8
};
const correctSlowAnswer = {
  isCorrect: true,
  time: 29
};
const incorrectAnswer = {
  isCorrect: false,
  time: 29
};
const testCases = [
  // all answers correct and slow
  {
    testDescription: `All answers correct and slow, 0 mistakes`,
    answers: Array(10).fill(correctSlowAnswer),
    lives: 3,
    correctResult: 650
  },
  // all answers correct and quick
  {
    testDescription: `All answers correct and quick, 2 mistakes`,
    answers: Array(10).fill(correctFastAnswer),
    lives: 1,
    correctResult: 1550
  },
  {
    // random time answers
    testDescription: `All answers correct, time is random, 0 mistakes`,
    answers: [...Array(4).fill(correctNormalAnswer), ...Array(3).fill(correctSlowAnswer), ...Array(3).fill(correctFastAnswer)],
    lives: 3,
    correctResult: 1150
  },
  // negative result, 0 lives
  {
    testDescription: `negative result, too many mistakes`,
    answers: [...Array(5).fill(correctNormalAnswer), ...Array(3).fill(incorrectAnswer)],
    lives: 0,
    correctResult: -1
  },
  // negative result, only 5 answers
  {
    testDescription: `negative result, not enough answers`,
    answers: [...Array(5).fill(correctNormalAnswer)],
    lives: 2,
    correctResult: -1
  }
];

describe(`Check if player points calculated correctly`, () => {
  testCases.forEach((currentCase) => {
    it(currentCase.testDescription, () => {
      assert.equal(calculatePoints(currentCase.answers, currentCase.lives), currentCase.correctResult);
    });
  });
});

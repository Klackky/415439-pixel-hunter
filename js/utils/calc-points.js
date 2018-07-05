import {AnswersTime} from '../game-consts';
import {Points} from '../game-consts';
import {MinimumRequirement} from '../game-consts';

/**
 * Function calculate points based on player`s performance
 *
 * @function calculatePoints
 * @param {array} answers array of user`s answers
 * @param {number} lives remaining lives
 * @return {number} final points
 */
const calculatePoints = (answers, lives) => {
  const correctAnswersArray = answers.filter((answer) => answer.answer);
  const fastAnswersArray = answers.filter((answer) => answer.time < AnswersTime.FAST_ANSWER);
  const slowAnswersArray = answers.filter((answer) => answer.time > AnswersTime.SLOW_ANSWER);
  let points = 0;
  if (lives < MinimumRequirement.LIVES || answers.length < MinimumRequirement.ANSWERS) {
    return -1;
  }
  points += ((correctAnswersArray.length) * Points.REGULAR_POINTS);
  points += ((fastAnswersArray.length) * Points.EXTRA_POINTS);
  points -= ((slowAnswersArray.length) * Points.EXTRA_POINTS);
  if (lives > MinimumRequirement.LIVES) {
    points += lives * Points.EXTRA_POINTS;
  }
  return points;
};
export default calculatePoints;

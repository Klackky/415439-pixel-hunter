const POINTS = {
  regularPoints: 100,
  extraPoints: 50
};
const ANSWER_TIME = {
  slowAnswer: 20,
  fastAnswer: 10
};
const MINIMUM_REQUIREMENT = {
  lives: 1,
  answers: 10
};
/**
 * Function calculate points based on player`s performance
 *
 * @function calculatePoints
 * @param {array} answers array of user`s answers
 * @param {number} lives remaining lives
 * @return {number} final points
 */
const calculatePoints = (answers, lives = 3) => {
  const correctAnswersArray = answers.filter((answer) => answer.answer);
  const fastAnswersArray = answers.filter((answer) => answer.time < ANSWER_TIME.fastAnswer);
  const slowAnswersArray = answers.filter((answer) => answer.time > ANSWER_TIME.slowAnswer);
  let points = 0;
  if (lives < MINIMUM_REQUIREMENT.lives || answers.length < MINIMUM_REQUIREMENT.answers) {
    return -1;
  }
  points += ((correctAnswersArray.length) * POINTS.regularPoints);
  points += ((fastAnswersArray.length) * POINTS.extraPoints);
  points -= ((slowAnswersArray.length) * POINTS.extraPoints);
  points += lives * POINTS.extraPoints;
  return points;
};
export default calculatePoints;

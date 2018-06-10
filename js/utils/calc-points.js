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
  const fastAnswersArray = answers.filter((answer) => answer.time < 10);
  const slowAnswersArray = answers.filter((answer) => answer.time > 20);
  let points = 0;
  if (lives < 1) {
    return -1;
  } else {
    points += ((correctAnswersArray.length) * 100);
    points += ((fastAnswersArray.length) * 50);
    points -= ((slowAnswersArray.length) * 50);
    points += lives * 50;
  }
  return points;
};
export default calculatePoints;

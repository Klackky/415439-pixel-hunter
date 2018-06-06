const calcPoints = (answers, lifes) => {
  const correctAnswersArray = answers.filter((answer) => answer.answer);
  const fastAnswersArray = answers.filter((answer) => answer.time < 10);
  const slowAnswersArray = answers.filter((answer) => answer.time > 20);
  let points = 0;
  if (lifes < 1) {
    return -1;
  } else {
    points += ((correctAnswersArray.length) * 100);
    points += ((fastAnswersArray.length) * 50);
    points -= ((slowAnswersArray.length) * 50);
    points += lifes * 50;
  }
  return points;
};
export default calcPoints;

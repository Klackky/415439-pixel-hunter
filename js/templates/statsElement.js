
const statsTemplate = (answers) => `
    <ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${checkState(answer)}"></li>`).join(``)}
    </ul>
`;
/**
 * Function calculate points based on player`s performance
 *
 * @function checkState
 * @param {object} answer we are work with
 * @return {result} result we are appending to the statsTemplate;
 */
const checkState = (answer) => {
  let result;
  if (answer.isCorrect && answer.time < 10) {
    result = `fast`;
  } if (answer.isCorrect && answer.time > 20) {
    result = `slow`;
  } if (!answer.isCorrect) {
    result = `wrong`;
  } else {
    result = `correct`;
  }
  return result;
};
export default statsTemplate;

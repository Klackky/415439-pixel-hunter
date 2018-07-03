import INITIAL_GAME_STATE from '../data/gameData';
import {AnswersTime} from '../game-consts';


/**
 * Function returns initial game state
 *
 * @function gameReset
 * @return {object} initial game state
*/
export const gameReset = () => {
  return JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
};

/**
 * Function checks if answer correct
 *
 * @function checkAnswers
 * @param {array} answers selected options
 * @param {object} currentLevel current level
 * @return {object} answer
 */
export const checkAnswers = (answers, currentLevel) => {
  for (const [index, question] of answers.entries()) {
    if (question.value !== currentLevel.answers[index].type) {
      return false;
    }
  }
  return true;
};

/**
 * Function filters array of answers
 *
 * @function filterAnswers
 * @param {array} level array of answers
 * @return {object} object of filtered arrays
 */
export const filterAnswers = (level) => {
  const fastAnswers = level.answers.filter((answer) => (answer.time < AnswersTime.FAST_ANSWER));
  const slowAnswers = level.answers.filter((answer) => (answer.time > AnswersTime.SLOW_ANSWER));
  const correctAnswers = level.answers.filter((answer) => answer.answer);
  const filteredAnswers = {
    fastAnswers,
    slowAnswers,
    correctAnswers
  };
  return filteredAnswers;
};

/**
 * Function changes 'painting' to 'paint' for more comfortable work with data structure
 *
 * @function preprocessAnswers
 * @param {string} answer
 * @return {string} new string with our answer
 */
const preprocessAnswers = (answer) => {
  let result = ``;
  if (answer === `painting`) {
    result += `paint`;
  } else {
    result += `photo`;
  }
  return result;
};

/**
 * Function adapt data structure we got from server for more comfortable work
 *
 * @function adaptServerData
 * @param {array} data
 * @return {array} new data we`re going to work with
 */
export const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    level.answers.map((answer) => {
      answer.type = preprocessAnswers(answer.type);
    });
  }
  return data;
};

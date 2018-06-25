import {playerData} from '../data/gameData';
export const gameReset = () => {
  playerData.level = 0;
  playerData.answers = [];
  playerData.lives = 3;
};
/**
 * Function rounds time
 *
 * @function roundTime
 * @param {number} time time in seconds
 * @return {number} time in minutes
 */
export const roundTime = (time) => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const roundedTime = {
    minutes,
    seconds: seconds > 9 ? seconds : `0` + seconds,
  };
  return roundedTime;
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
    if (question.value !== currentLevel.questions[index].type) {
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
  const fastAnswers = level.answers.filter((answer) => (answer.time < 10));
  const slowAnswers = level.answers.filter((answer) => (answer.time > 20));
  const correctAnswers = level.answers.filter((answer) => answer.isCorrect);
  const filteredAnswers = {
    fastAnswers,
    slowAnswers,
    correctAnswers
  };
  return filteredAnswers;
};

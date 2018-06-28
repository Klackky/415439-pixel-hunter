import {playerData} from '../data/gameData';
const ANSWERS_OPTIONS_TIME = {
  slowAnswer: 20,
  fastanswer: 10,
};
const TIME = {
  seconds: 3600,
  minute: 60,
  maxSeconds: 9
};
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
  const minutes = Math.floor((time % TIME.seconds) / TIME.minute);
  const seconds = time % TIME.minute;
  const roundedTime = {
    minutes,
    seconds: seconds > TIME.maxSeconds ? seconds : `0` + seconds,
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
  const fastAnswers = level.answers.filter((answer) => (answer.time < ANSWERS_OPTIONS_TIME.fastanswer));
  const slowAnswers = level.answers.filter((answer) => (answer.time > ANSWERS_OPTIONS_TIME.slowAnswer));
  const correctAnswers = level.answers.filter((answer) => answer.isCorrect);
  const filteredAnswers = {
    fastAnswers,
    slowAnswers,
    correctAnswers
  };
  return filteredAnswers;
};

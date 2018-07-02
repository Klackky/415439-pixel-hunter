import INITIAL_GAME_STATE from '../data/gameData';
import {AnswersTime} from '../game-consts';

const TimeUtils = {
  SECONDS: 3600,
  MINUTE: 60,
  MAX_SECONDS: 9
};

export const gameReset = () => {
  return JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
};
/**
 * Function rounds time
 *
 * @function roundTime
 * @param {number} time time in seconds
 * @return {number} time in minutes
 */
export const roundTime = (time) => {
  const minutes = Math.floor((time % TimeUtils.SECONDS) / TimeUtils.MINUTE);
  const seconds = time % TimeUtils.MINUTE;
  const roundedTime = {
    minutes,
    seconds: seconds > TimeUtils.MAX_SECONDS ? seconds : `0` + seconds,
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

const preprocessAnswers = (answer) => {
  let result = ``;
  if (answer === `painting`) {
    result += `paint`;
  } else {
    result += `photo`;
  }
  return result;
};
export const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    level.answers.map((answer) => {
      answer.type = preprocessAnswers(answer.type);
    });
  }
  return data;
};

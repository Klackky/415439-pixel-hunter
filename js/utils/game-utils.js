import INITIAL_GAME_STATE from '../data/gameData';
export const gameReset = () => {
  INITIAL_GAME_STATE.level = 0;
  INITIAL_GAME_STATE.answers = [];
  INITIAL_GAME_STATE.lives = 3;
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

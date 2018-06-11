/**
 * Function responsible for timer creation
 *
 * @function createTimer
 * @param {number}  timeLeft - time left.
 * @return {object} timer.
 */
const createTimer = (timeLeft) => {
  if (typeof timeLeft !== `number`) {
    throw new Error(`Timer should be of type number`);
  }
  const countdown = timeLeft > 0 ? timeLeft : 0;
  return {
    countdown,
    tick(seconds = 1) {
      return createTimer(countdown - seconds);
    }
  };
};
export default createTimer;

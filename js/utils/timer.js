/**
function responsible for creating timer.
 * @param {number}  time - time left.
 * @return {object} timer.
 */
const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Timer should be of type number`);
  }
  const countdown = time > 0 ? time : 0;
  return {
    countdown,
    tick: () => {
      return createTimer(countdown - 1);
    }
  };
};
export default createTimer;

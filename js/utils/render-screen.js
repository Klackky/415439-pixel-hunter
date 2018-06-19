/**
 * Function responsible for screen render
 *
 * @function renderScreen
 * @param {node} screen we are appending to.
 */
const renderScreen = (screen) => {
  const MAIN_SCREEN_CONTAINER = document.querySelector(`.central`);
  while (MAIN_SCREEN_CONTAINER.firstChild) {
    MAIN_SCREEN_CONTAINER.firstChild.remove();
  }
  MAIN_SCREEN_CONTAINER.appendChild(screen);
};
export default renderScreen;

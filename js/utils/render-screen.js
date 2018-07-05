/**
 * Function responsible for screen render
 *
 * @function renderScreen
 * @param {node} screen we are appending to.
 */
const renderScreen = (screen) => {
  const mainScreenContainer = document.querySelector(`.central`);
  while (mainScreenContainer.firstChild) {
    mainScreenContainer.firstChild.remove();
  }
  mainScreenContainer.appendChild(screen);
};
export default renderScreen;

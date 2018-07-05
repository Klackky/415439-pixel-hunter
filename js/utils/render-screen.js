import {mainScreenContainer} from '../game-consts';
/**
 * Function responsible for screen render
 *
 * @function renderScreen
 * @param {node} screen we are appending to.
 */
const renderScreen = (screen) => {
  mainScreenContainer.innerHTML = ``;
  mainScreenContainer.appendChild(screen);
};
export default renderScreen;

import renderScreen from './utils/render-screen';
import greetingScreen from './screens/greeting';
import INITIAL_GAME_STATE from './data/gameData';
import {gameReset} from './utils/game-utils';
/**
 * render of greeting screen on button back click
 *
 * @function returnToGreetingScreen
 * @param {node} screen we`re working with
 */
const returnToGreetingScreen = (screen) => {
  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderScreen(greetingScreen);
    INITIAL_GAME_STATE.games.push({answers: INITIAL_GAME_STATE.answers, lives: INITIAL_GAME_STATE.lives});
    gameReset();
  });
};
export default returnToGreetingScreen;

import renderScreen from './utils/render-screen';
import greetingScreen from './screens/greeting';
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
  });
};
export default returnToGreetingScreen;

import renderScreen from './utils/render-screen';
import greetingScreen from './screens/greeting';
const returnToGreetingScreen = (screen) => {
  const backButton = screen.querySelector(`.back`);
  backButton.addEventListener(`click`, () => {
    renderScreen(greetingScreen);
  });
};
export default returnToGreetingScreen;

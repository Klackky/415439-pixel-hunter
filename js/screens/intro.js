import createNewDomElement from '../utils/create-new-element';
import renderScreen from '../utils/render-screen';
import greetingScreen from './greeting';
import footerTemplate from '../templates/footer';
const intro = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
${footerTemplate}`;
const introScreen = createNewDomElement(intro);
const playButton = introScreen.querySelector(`.intro__asterisk`);
playButton.addEventListener(`click`, () => {
  renderScreen(greetingScreen);
});
export default introScreen;

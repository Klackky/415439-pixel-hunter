import createNewDomElement from '../utils/create-new-element';
import renderScreen from '../utils/render-screen';
import gameScreen from './gameScreen';
import returnToGreetingScreen from '../backButton';
import INITIAL_GAME_STATE from '../data/gameData';
import data from '../data/answers';
import {arrowBack} from '../templates/header';
import footerTemplate from '../templates/footer';
const rules = `<header class="header">
  ${arrowBack}
</header>
<div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>
${footerTemplate}`;
const rulesScreen = createNewDomElement(rules);
const submitButton = rulesScreen.querySelector(`.rules__button`);
const submitForm = rulesScreen.querySelector(`.rules__form`);
submitForm.addEventListener(`input`, () => {
  submitButton.disabled = false;
});
submitButton.addEventListener(`click`, () => {
  renderScreen(gameScreen(data[INITIAL_GAME_STATE.level]));
  submitButton.disabled = true;
});
returnToGreetingScreen(rulesScreen);
export default rulesScreen;

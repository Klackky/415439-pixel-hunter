// import renderScreen from './utils/render-screen';
// import greetingScreen from './screens/greeting';
// import {playerData} from './data/gameData';
// import {gameReset} from './utils/game-utils';
import AbstractView from '../abstract-view';
export default class BackButton extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>`;
  }
  onClick() {

  }

  bind(element) {
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onClick();
    });
  }

}

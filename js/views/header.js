import AbstractView from '../abstract-view';
import createTimer from '../utils/timer';
import {GameStandarts} from '../game-consts';
const lostLife = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`;
const savedLife = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`;
const BLINK_TIME = 5;
export default class HeaderTemplate extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<header class="header">
        ${arrowBack}
        <h1 class="game__timer"> ${createTimer(this.state.time).countdown}  </h1>
        <div class="game__lives">
        ${new Array(GameStandarts.MAX_LIVES - this.state.lives).fill(lostLife).join(``)}
        ${new Array(this.state.lives < GameStandarts.MIN_LIVES ? GameStandarts.MIN_LIVES : this.state.lives).fill(savedLife).join(``)}
        </div>
      </header>`;
  }
  onBackButton() {

  }

  bind(element) {
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButton();
    });
  }

  blinkTimer(time) {
    const timer = this.element.querySelector(`.game__timer`);
    if (this.state.time <= BLINK_TIME) {
      timer.classList.add(`blinking`);
    }
    timer.textContent = time;
  }
}

export const arrowBack = `
<div class="header__back">
  <button class="back">
    <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
    <img src="img/logo_small.svg" width="101" height="44">
  </button>
</div>
`;

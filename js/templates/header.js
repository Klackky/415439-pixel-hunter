import AbstractView from '../abstract-view';
const lostLife = `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`;
const savedLife = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`;
export default class HeaderTemplate extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  blinkTimer() {
    if (this.state.time) {
      let timerBlink = ``;
      if (this.state.time <= 5) {
        timerBlink += `blinking`;
      }
      return `<h1 class="game__timer ${timerBlink}">${this.state.time}</h1>`;
    }
    return ``;
  }

  get template() {
    return `<header class="header">
        ${arrowBack}
        ${this.blinkTimer(this.state.time)}
        <div class="game__lives">
        ${new Array(3 - this.state.lives).fill(lostLife).join(``)}
        ${new Array(this.state.lives < 0 ? 0 : this.state.lives).fill(savedLife).join(``)}
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
}

export const arrowBack = `
<div class="header__back">
  <button class="back">
    <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
    <img src="img/logo_small.svg" width="101" height="44">
  </button>
</div>
`;

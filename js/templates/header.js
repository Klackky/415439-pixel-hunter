import {roundTime} from '../utils/game-utils';
import AbstractView from '../abstract-view';
export default class HeaderTemplate extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<header class="header">
        ${arrowBack}
        ${timer(this.state.time)}
        ${gameLives(this.state.lives)}
      </header>`;
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
export const gameLives = (gameState) => `
<div class="game__lives">
${new Array(3 - gameState)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
  .join(``)}
${new Array(gameState)
  .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
  .join(``)}
</div>
`;

export const timer = (time) => `
  <h1 class="game__timer">${roundTime(time).minutes}:${roundTime(time).seconds} </h1>
`;

const headerTemplate = (gameState) => `
<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">NN</h1>
    <div class="game__lives">
    ${new Array(3 - gameState)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    ${new Array(gameState)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
    </div>
  </header>
`;
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
  <h1 class="game__timer">${time}</h1>
`;
export default headerTemplate;

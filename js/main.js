'use strict';
const MAIN_SCREEN_CONTAINER = document.querySelector(`.central`);
const ALL_SCREENS = [
  document.querySelector(`#greeting`),
  document.querySelector(`#rules`),
  document.querySelector(`#game-1`),
  document.querySelector(`#game-2`),
  document.querySelector(`#game-3`),
  document.querySelector(`#stats`)
];
let currentScreenIndex = 0;

const ARROW_KEYS = {
  PREVIOUS_ARROW: 37,
  NEXT_ARROW: 39
};

const arrowsMarkup = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>
`;

document.body.insertAdjacentHTML(`beforeend`, arrowsMarkup);

/**
 * function responsible for screen render
 * @param {number} number of selected screen in array
*/

const renderScreen = (screenIndex) => {
  MAIN_SCREEN_CONTAINER.innerHTML = ``;
  const mainScreen = ALL_SCREENS[screenIndex].content.cloneNode(true);
  MAIN_SCREEN_CONTAINER.appendChild(mainScreen);
  return mainScreen;
};

const previousButton = document.querySelectorAll(`.arrows__btn`)[0];
const nextButton = document.querySelectorAll(`.arrows__btn`)[1];

const selectNextScreen = () => {
  currentScreenIndex = currentScreenIndex < ALL_SCREENS.length - 1 ? ++currentScreenIndex : 0;
};

const selectPreviousScreen = () => {
  currentScreenIndex = currentScreenIndex !== 0 ? --currentScreenIndex : 0;
};
previousButton.addEventListener(`click`, () => {
  selectPreviousScreen();
  renderScreen(currentScreenIndex);
});
nextButton.addEventListener(`click`, () => {
  selectNextScreen();
  renderScreen(currentScreenIndex);
});

/**
 * function responsible for switching screens
 * @param {event} event keyboard event
*/

const onArrowAndAltPress = (event) => {
  if (event.keyCode === ARROW_KEYS.NEXT_ARROW && event.altKey) {
    selectNextScreen();
  }
  if (event.keyCode === ARROW_KEYS.PREVIOUS_ARROW && event.altKey) {
    selectPreviousScreen();
  }
  renderScreen(currentScreenIndex);
};
document.addEventListener(`keydown`, onArrowAndAltPress);
renderScreen(currentScreenIndex);

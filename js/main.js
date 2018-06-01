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

const arrowsKeys = {
  PREVIOUS_ARROW: 37,
  NEXT_ARROW: 39
};

const ARROWS_MARKUP = `
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

document.body.insertAdjacentHTML(`beforeend`, ARROWS_MARKUP);
/**
 * function renderScreen responsible for screen render
 * @param {number} screenIndex number of selected screen in array
*/
const renderScreen = (screenIndex) => {
  MAIN_SCREEN_CONTAINER.innerHTML = ``;
  const mainScreen = ALL_SCREENS[screenIndex].content.cloneNode(true);
  MAIN_SCREEN_CONTAINER.appendChild(mainScreen);
};
const buttons = document.querySelectorAll(`.arrows__btn`);
buttons[0].dataset.Id = 0;
buttons[1].dataset.Id = 1;
/**
 * function selectNextScreen responsible for selecting next screen
*/
const selectNextScreen = () => {
  if (currentScreenIndex < ALL_SCREENS.length - 1) {
    ++currentScreenIndex;
  } else {
    currentScreenIndex = 0;
  }
};
/**
 * function selectNextScreen responsible for selecting previous screen
*/
const selectPreviousScreen = () => {
  if (currentScreenIndex !== 0) {
    --currentScreenIndex;
  } else {
    currentScreenIndex = 0;
  }
};
/**
 * function switchScreens responsible for switching screens
 * @param {event} event keyboard event
*/
const switchScreens = (event) => {
  if (event.keyCode === arrowsKeys.NEXT_ARROW && event.altKey || event.currentTarget.getAttribute(`data--id`) === `1`) {
    selectNextScreen();
  }
  if (event.keyCode === arrowsKeys.PREVIOUS_ARROW && event.altKey || event.currentTarget.getAttribute(`data--id`) === `0`) {
    selectPreviousScreen();
  }
  renderScreen(currentScreenIndex);
};
buttons.forEach((button) => {
  button.addEventListener(`click`, (event) => {
    switchScreens(event);
  });
});
document.addEventListener(`keydown`, switchScreens);
renderScreen(currentScreenIndex);

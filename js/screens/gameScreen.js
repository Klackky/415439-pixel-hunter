import createNewDomElement from '../utils/create-new-element';
import renderScreen from '../utils/render-screen';
import INITIAL_GAME_STATE from '../data/gameData';
import returnToGreetingScreen from '../backButton';
import statsTemplate from '../templates/statsElement';
import footerTemplate from '../templates/footer';
import data from '../data/answers';
import statsScreen from './stats';
import {arrowBack} from '../templates/header';
import {timer} from '../templates/header';
import {gameLives} from '../templates/header';

/**
 * Function creates game screen
 *
 * @function gameScreen
 * @param {object} level current state of game
 * @return {node} currentScreen
 */

const gameScreen = (level) => {
  const screenTemplate = `<header class="header"> ${arrowBack} ${timer(300)} ${gameLives(INITIAL_GAME_STATE.lives)} </header>
  <div class="game">
    <p class="game__task">${level.task}</p>
  ${renderQuestions(level)}
  <div class="stats">
${statsTemplate(INITIAL_GAME_STATE.answers)}
</div>
  </div>
${footerTemplate}`;

  const currentScreen = createNewDomElement(screenTemplate);
  // game1
  if (level.gameType === `game1`) {
    const gameForm = currentScreen.querySelector(`.game__content`);
    const checkRadioButtons = () => {
      const answers = Array.from(gameForm.querySelectorAll(`input:checked`));
      if (answers.length === 2) {
        checkAnswers(answers, level);
        if (INITIAL_GAME_STATE.lives === 0 || INITIAL_GAME_STATE.level === 9) {
          renderScreen(statsScreen(INITIAL_GAME_STATE));
        } else {
          renderScreen(gameScreen(data[++INITIAL_GAME_STATE.level]));
        }
      }
    };
    gameForm.addEventListener(`change`, checkRadioButtons);
  }
  // game2
  if (level.gameType === `game2`) {
    const form = currentScreen.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const answers = Array.from(form.querySelectorAll(`input:checked`));
      if (answers.some((answer) => answer.checked)) {
        checkAnswers(answers, level);
        if (INITIAL_GAME_STATE.lives === 0) {
          renderScreen(statsScreen(INITIAL_GAME_STATE));
        } else {
          renderScreen(gameScreen(data[++INITIAL_GAME_STATE.level]));
        }
      }
    });
  }
  // game3
  if (level.gameType === `game3`) {
    const answers = Array.from(currentScreen.querySelectorAll(`.game__option`));
    answers.forEach((answer, index) => {
      answer.addEventListener(`click`, () => {
        const isCorrectAnswer = level.questions[index].isCorrect;
        INITIAL_GAME_STATE.answers.push({isCorrect: level.questions[index].isCorrect, time: 15});
        if (!isCorrectAnswer) {
          --INITIAL_GAME_STATE.lives;
          if (INITIAL_GAME_STATE.lives === 0) {
            renderScreen(statsScreen(INITIAL_GAME_STATE));
          } else {
            renderScreen(gameScreen(data[++INITIAL_GAME_STATE.level]));
          }
        } else {
          renderScreen(gameScreen(data[++INITIAL_GAME_STATE.level]));
        }
      });
    });
  }
  returnToGreetingScreen(currentScreen);
  return currentScreen;
};

/**
 * Function checks if answer correct
 *
 * @function checkAnswers
 * @param {array} array selected options
 * @param {object} currentLevel current level
 * @return {object} answer
 */

const checkAnswers = (array, currentLevel) => {
  for (const [index, value] of array.entries()) {
    if (value.value !== currentLevel.questions[index].type) {
      --INITIAL_GAME_STATE.lives;
      return INITIAL_GAME_STATE.answers.push({isCorrect: false, time: 15});
    }
  }
  return INITIAL_GAME_STATE.answers.push({isCorrect: true, time: 15});
};

/**
 * Function selects which level we need to render
 *
 * @function renderQuestions
 * @param {object} level current level
 * @return {string} string we`re appending to the dom
 */

const renderQuestions = (level) => {
  if (level.gameType === `game1`) {
    return `
    <form class="game__content">
    ${level.questions.map((question, index) => `<div class="game__option">
          <img src="${question.src}" alt="Option ${index}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question${index}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${index}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)
}</form>`;
  }
  if (level.gameType === `game2`) {
    return `
      <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${level.questions[0].src}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    </form>
    `;
  }
  return `
  <form class="game__content  game__content--triple">
  ${level.questions.map((question, index) => `<div class="game__option">
          <img src="${question.src}" alt="Option ${index}" width="304" height="455">
        </div>`)
}</form>
`;

};
export default gameScreen;

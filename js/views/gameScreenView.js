import AbstractView from '../abstract-view';
import statsTemplate from '../templates/statsElement';
import FooterTemplate from '../templates/footer';
import HeaderTemplate from '../templates/header';
import data from '../data/answers';
import {checkAnswers} from '../utils/game-utils';
import renderQuestions from '../templates/questions';
export default class GameScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `${new HeaderTemplate(this.state).template}
    <div class="game">
      <p class="game__task">${data[this.state.level].task}</p>
    ${renderQuestions(data[this.state.level])}
    <div class="stats">
  ${statsTemplate(this.state.answers)}
  </div>
    </div>
${new FooterTemplate().template}`;
  }

  onAnswer() {

  }

  onBackButton() {

  }

  bind(element) {
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButton();
    });

    const currentLevel = data[this.state.level];
    switch (currentLevel.gameType) {
      case `game1`: {
        const gameForm = element.querySelector(`.game__content`);
        const checkRadioButtons = () => {
          const answers = Array.from(gameForm.querySelectorAll(`input:checked`));
          if (answers.length === 2) {
            this.onAnswer(checkAnswers(answers, currentLevel));
          }
        };
        gameForm.addEventListener(`change`, checkRadioButtons);
        break;
      }

      case `game2`: {
        const form = element.querySelector(`.game__content`);
        form.addEventListener(`change`, () => {
          const answers = Array.from(form.querySelectorAll(`input:checked`));
          if (answers.some((answer) => answer.checked)) {
            checkAnswers(answers, currentLevel);
            this.onAnswer(checkAnswers(answers, currentLevel));
          }
        });
        break;
      }

      case `game3`: {
        const answers = Array.from(element.querySelectorAll(`.game__option`));
        answers.forEach((answer, index) => {
          answer.addEventListener(`click`, () => {
            this.onAnswer(currentLevel.questions[index].type === `paint`);
          });
        });
        break;
      }
    }
  }
}

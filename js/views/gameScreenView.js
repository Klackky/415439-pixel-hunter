import AbstractView from '../abstract-view';
import {checkAnswers} from '../utils/game-utils';
import renderQuestions from '../templates/questions';
export default class GameScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.state.task}</p>
    ${renderQuestions(this.state)}
    </div>`;
  }

  onAnswer() {

  }


  bind(element) {
    switch (this.state.gameType) {
      case `game1`: {
        const gameForm = element.querySelector(`.game__content`);
        const checkRadioButtons = () => {
          const answers = Array.from(gameForm.querySelectorAll(`input:checked`));
          if (answers.length === 2) {
            this.onAnswer(checkAnswers(answers, this.state));
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
            checkAnswers(answers, this.state);
            this.onAnswer(checkAnswers(answers, this.state));
          }
        });
        break;
      }

      case `game3`: {
        const answers = Array.from(element.querySelectorAll(`.game__option`));
        answers.forEach((answer, index) => {
          answer.addEventListener(`click`, () => {
            this.onAnswer(this.state.questions[index].type === `paint`);
          });
        });
        break;
      }
    }
  }
}

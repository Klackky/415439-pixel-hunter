import AbstractView from '../abstract-view';
import {checkAnswers} from '../utils/game-utils';
import renderQuestions from '../templates/questions';
import StatsBarTemplate from '../templates/statsElement';
export default class GameScreen extends AbstractView {
  constructor(state, level) {
    super();
    this.level = level;
    this.state = state;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.state.question}</p>
    ${renderQuestions(this.state)}
    ${new StatsBarTemplate(this.level).template}
    </div>`;
  }

  onAnswer() {

  }


  bind(element) {
    switch (this.state.type) {
      case `two-of-two`: {
        const gameForm = element.querySelector(`.game__content`);
        const onRadioButtonsCheck = () => {
          const answers = Array.from(gameForm.querySelectorAll(`input:checked`));
          if (answers.length === 2) {
            this.onAnswer(checkAnswers(answers, this.state));
          }
        };
        gameForm.addEventListener(`change`, onRadioButtonsCheck);
        break;
      }

      case `tinder-like`: {
        const form = element.querySelector(`.game__content`);
        form.addEventListener(`change`, () => {
          const answers = Array.from(form.querySelectorAll(`input:checked`));
          if (answers.some((answer) => answer.checked)) {
            this.onAnswer(checkAnswers(answers, this.state));
          }
        });
        break;
      }

      case `one-of-three`: {
        const answers = Array.from(element.querySelectorAll(`.game__option`));
        answers.forEach((answer, index) => {
          answer.addEventListener(`mouseup`, () => {
            if (this.state.question === `Найдите рисунок среди изображений`) {
              this.onAnswer(this.state.answers[index].type === `paint`);
            } else {
              this.onAnswer(this.state.answers[index].type === `photo`);
            }
          });
        });
        break;
      }
    }
  }
}

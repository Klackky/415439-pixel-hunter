import AbstractView from '../abstract-view';
import renderQuestions from '../templates/questions';
import StatsBarTemplate from '../templates/stats-element';
import {checkAnswers} from '../utils/game-utils';

export default class GameView extends AbstractView {
  constructor(state, level) {
    super();
    this.level = level;
    this.state = state;
  }

  translateQuestion(question) {
    if (this.state.question === `Найдите рисунок среди изображений`) {
      return `Find a painting among these images`;
    } if (this.state.question === `Угадайте для каждого изображения фото или рисунок?`) {
      return `Guess for every image if it is a photo or a painting`;
    } if (this.state.question === `Найдите фото среди изображений`) {
      return `Find a photo among these images`;
    } else {
      return `Guess is it a painting or a photo?`;
    }
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.translateQuestion(this.state.question)}</p>
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
        const gameForm = element.querySelector(`.game__content`);
        gameForm.addEventListener(`change`, () => {
          const answers = Array.from(gameForm.querySelectorAll(`input:checked`));
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

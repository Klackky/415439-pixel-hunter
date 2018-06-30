import AbstractView from '../abstract-view';
export default class StatsBarTemplate extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<div class="stats"> <ul class="stats">
    ${this.state.answers.map((answer) => `<li class="stats__result stats__result--${checkState(answer)}"></li>`).join(``)}
    </ul> </div>`;
  }
}

/**
 * Function calculate points based on player`s performance
 *
 * @function checkState
 * @param {object} answer we are work with
 * @return {result} result we are appending to the statsTemplate;
 */
const checkState = (answer) => {
  let result;
  if (answer.answer && answer.time < 10) {
    result = `fast`;
  } if (answer.answer && answer.time > 20) {
    result = `slow`;
  } if (!answer.answer) {
    result = `wrong`;
  } else {
    result = `correct`;
  }
  return result;
};

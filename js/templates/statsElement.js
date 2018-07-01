import AbstractView from '../abstract-view';
export default class StatsBarTemplate extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<div class="stats"> <ul class="stats">
    ${renderStatsBar(this.state.answers)}
    </ul> </div>`;
  }
}


const renderStatsBar = (answers) => {
  const answersType = answers.map((answer) => {
    return checkState(answer);
  });
  let markup = answersType.reduce((acc, value) => {
    return acc + `<li class="stats__result stats__result--${value}"></li>`;
  }, ``);
  if (answersType.length < 10) {
    for (let i = 0; i < 10 - answers.length; i++) {
      markup += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return markup;
};
/**
 * Function calculate points based on player`s performance
 *
 * @function checkState
 * @param {object} answer we are work with
 * @return {result} result we are appending to the statsTemplate;
 */
const checkState = (answer) => {
  let result;
  if (answer.answer) {
    if (answer.time < 10) {
      result = `fast`;
    } else if (answer.time > 20) {
      result = `slow`;
    } else {
      result = `correct`;
    }
  } else {
    result = `wrong`;
  }

  return result;
};

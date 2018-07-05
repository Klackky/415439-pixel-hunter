import AbstractView from '../abstract-view';
import {GameStandarts} from '../game-consts';
import {AnswersTime} from '../game-consts';
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
  if (answersType.length < GameStandarts.MIN_ANSWERS) {
    for (let i = 0; i < GameStandarts.MIN_ANSWERS - answers.length; i++) {
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
  if (answer.answer) {
    if (answer.time < AnswersTime.FAST_ANSWER) {
      return `fast`;
    } else if (answer.time > AnswersTime.SLOW_ANSWER) {
      return `slow`;
    } else {
      return `correct`;
    }
  }
  return `wrong`;
};

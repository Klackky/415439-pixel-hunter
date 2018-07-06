import FooterTemplate from '../templates/footer';
import calculatePoints from '../utils/calc-points';
import AbstractView from '../abstract-view';
import createNewDomElement from '../utils/create-new-element';
import StatsTemplate from '../templates/stats-element';
import {filterAnswers} from '../utils/game-utils';
import {Points} from '../game-consts';
const NUMBER_OF_ANSWER = 1;
export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<div class="result">
       <h1>${calculatePoints(this.state.answers, this.state.lives) !== -1 ? `Победа!` : `Поражение!`}</h1> </div>
       ${new FooterTemplate().template}`;
  }

  showScores(scores) {
    let string = ``;
    scores.reverse().map((game, index) => {
      if (calculatePoints(game.answers, game.lives) === -1) {
        string += `<table class="result__table">
       <tr>
         <td class="result__number">${index + NUMBER_OF_ANSWER}.</td>
         <td>
         ${new StatsTemplate(game).template}
         </td>
         <td class="result__total"></td>
         <td class="result__total  result__total--final">fail</td>
       </tr>`;
      } else {
        string += `<table class="result__table">
      <tr>
        <td class="result__number">${index + NUMBER_OF_ANSWER}.</td>
        <td colspan="2">
        ${new StatsTemplate(game).template}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${filterAnswers(game).correctAnswers.length * Points.REGULAR_POINTS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${filterAnswers(game).fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${filterAnswers(game).fastAnswers.length * Points.EXTRA_POINTS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${game.lives * Points.EXTRA_POINTS}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${filterAnswers(game).slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${filterAnswers(game).slowAnswers.length * Points.EXTRA_POINTS}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${calculatePoints(game.answers, game.lives)}</td>
      </tr>
      </table>`;
      }

    });
    this._scoreBoardContainer.insertAdjacentElement(`afterend`, createNewDomElement(string));
  }

  bind() {
    this._scoreBoardContainer = this.element.querySelector(`.result`);
  }
}

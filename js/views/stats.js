import FooterTemplate from '../templates/footer';
import calculatePoints from '../utils/calc-points';
import AbstractView from '../abstract-view';
import {arrowBack} from '../views/header';
import StatsTemplate from '../templates/statsElement';
import {filterAnswers} from '../utils/game-utils';
import {Points} from '../game-consts';
import createNewDomElement from '../utils/create-new-element';
const NUMBER_OF_ANSWER = 2;
export default class StatsScreen extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<header class="header">
       ${arrowBack}
     </header>
     <div class="result">
       <h1>${calculatePoints(this.state.answers) !== -1 ? `Победа!` : `FAIL`}</h1>
       <table class="result__table">
         <tr>
           <td class="result__number">1.</td>
           <td colspan="2">
   ${new StatsTemplate(this.state).template}
           </td>
           <td class="result__points">×&nbsp;100</td>
           <td class="result__total">${filterAnswers(this.state).correctAnswers.length * Points.REGULAR_POINTS}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Бонус за скорость:</td>
           <td class="result__extra">${filterAnswers(this.state).fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${filterAnswers(this.state).fastAnswers.length * Points.EXTRA_POINTS}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Бонус за жизни:</td>
           <td class="result__extra">${this.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${this.state.lives * Points.EXTRA_POINTS}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Штраф за медлительность:</td>
           <td class="result__extra">${filterAnswers(this.state).slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${filterAnswers(this.state).slowAnswers.length !== 0 ? (filterAnswers(this.state).slowAnswers.length * Points.EXTRA_POINTS) : 0}</td>
         </tr>
         <tr>
           <td colspan="5" class="result__total  result__total--final">${calculatePoints(this.state.answers, this.state.lives)}</td>
         </tr>
       </table>
     </div>
     ${new FooterTemplate().template}`;
  }
  onBackButton() {

  }
  showScores(scores) {
    let string = ``;
    scores.pop();
    scores.reverse().map((game, index) => {
      if (calculatePoints(game.answers) === -1) {
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
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${game.lives * Points.EXTRA_POINTS}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${calculatePoints(game.answers, game.lives)}</td>
      </tr>
      </table>`;
      }

    });
    this._scoreBoardContainer.insertAdjacentElement(`afterend`, createNewDomElement(string));
  }

  bind(element) {
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButton();
    });
    this._scoreBoardContainer = this.element.querySelector(`.result`);
  }
}

import FooterTemplate from '../templates/footer';
import calculatePoints from '../utils/calc-points';
import AbstractView from '../abstract-view';
import {playerData} from '../data/gameData';
import {arrowBack} from '../templates/header';
import statsTemplate from '../templates/statsElement';
import {filterAnswers} from '../utils/game-utils';
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
   ${statsTemplate(this.state.answers)}
           </td>
           <td class="result__points">×&nbsp;100</td>
           <td class="result__total">${filterAnswers(this.state).correctAnswers.length}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Бонус за скорость:</td>
           <td class="result__extra">${filterAnswers(this.state).fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${filterAnswers(this.state).fastAnswers.length * 50}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Бонус за жизни:</td>
           <td class="result__extra">${this.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${this.state.lives * 50}</td>
         </tr>
         <tr>
           <td></td>
           <td class="result__extra">Штраф за медлительность:</td>
           <td class="result__extra">${filterAnswers(this.state).slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
           <td class="result__points">×&nbsp;50</td>
           <td class="result__total">${filterAnswers(this.state).slowAnswers.length !== 0 ? `-`(filterAnswers(this.state).slowAnswers.length * 50) : 0}</td>
         </tr>
         <tr>
           <td colspan="5" class="result__total  result__total--final">${calculatePoints(this.state.answers, this.state.lives)}</td>
         </tr>
       </table>
 ${historyResult()}
     </div>
     ${new FooterTemplate().template}`;
  }
  onBackButton() {

  }
  bind(element) {
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButton();
    });

  }
}
/**
 * Function renders results from previous games
 *
 * @function historyResult
 * @return {string} previous result
 */
const historyResult = () => {
  let string = ``;
  if (playerData.games[0]) {
    playerData.games.forEach((game, index) => {
      if (calculatePoints(game.answers) === -1) {
        string += `<table class="result__table">
           <tr>
             <td class="result__number">${index + 2}.</td>
             <td>
             ${statsTemplate(game.answers)}
             </td>
             <td class="result__total"></td>
             <td class="result__total  result__total--final">fail</td>
           </tr>
         </table>`;
      } else {
        string += `<table class="result__table">
          <tr>
            <td class="result__number">${index + 2}.</td>
            <td colspan="2">
            ${statsTemplate(game.answers)}
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${filterAnswers(game).correctAnswers.length * 100}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${game.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${game.lives * 50}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${calculatePoints(game.answers, game.lives)}</td>
          </tr>
        </table>`;
      }
    });
  }
  return string;
};

import createNewDomElement from '../utils/create-new-element';
import returnToGreetingScreen from '../backButton';
import footerTemplate from '../templates/footer';
import calculatePoints from '../utils/calc-points';
import INITIAL_GAME_STATE from '../data/gameData';
import {arrowBack} from '../templates/header';
import statsTemplate from '../templates/statsElement';
const stats = (level) => {
  const fastAnswers = level.answers.filter((answer) => (answer.time < 10));
  const slowAnswers = level.answers.filter((answer) => (answer.time > 20));
  const correctAnswers = level.answers.filter((answer) => answer.isCorrect);
  const statsScreenTemplate = `<header class="header">
      ${arrowBack}
    </header>
    <div class="result">
      <h1>${calculatePoints(INITIAL_GAME_STATE.answers) !== -1 ? `Победа!` : `FAIL`}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
  ${statsTemplate(level.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${correctAnswers.length}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${fastAnswers.length}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${fastAnswers.length * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${INITIAL_GAME_STATE.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${INITIAL_GAME_STATE.lives * 50}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${slowAnswers.length}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${slowAnswers.length !== 0 ? `-`(slowAnswers.length * 50) : 0}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${calculatePoints(INITIAL_GAME_STATE.answers, INITIAL_GAME_STATE.lives)}</td>
        </tr>
      </table>
${historyResult()}
    </div>
    ${footerTemplate}`;
  const statsScreen = createNewDomElement(statsScreenTemplate);
  returnToGreetingScreen(statsScreen);
  return statsScreen;
};
/**
 * Function renders results from previous games
 *
 * @function historyResult
 * @return {string} previous result
 */
const historyResult = () => {
  let string = ``;
  if (INITIAL_GAME_STATE.games[0]) {
    INITIAL_GAME_STATE.games.forEach((game, index) => {
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
            <td class="result__total">900</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">100</td>
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

export default stats;

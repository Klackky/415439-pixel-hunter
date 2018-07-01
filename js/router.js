import IntroScreen from './presenters/introPresenter';
import GreetingScreen from './presenters/greetingPresenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rulesPresenter';
import StatsScreenPresenter from './presenters/statsScreenPresenter';
import GamePresenter from './presenters/GamePresenter';
import ErrorView from './views/error-screen';
import GameModel from './gameModel';
import {adaptServerData} from './utils/game-utils';
import Loader from './loader';
const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
let gameData;
export default class Router {
  static showIntro() {
    const introView = new IntroScreen();
    renderScreen(introView.element);
    window.fetch(SERVER_URL).
      then(checkStatus).
      then((response)=> response.json()).
      then((data) => {
        gameData = adaptServerData(data);
      }).
      then(() => Router.showGreetingScreen()).
      catch(Router.showError);
  }

  static showGreetingScreen() {
    const greetingScreenView = new GreetingScreen();
    renderScreen(greetingScreenView.element);
  }
  static showRulesScreen() {
    const rulesScreenView = new RulesPresenter();
    renderScreen(rulesScreenView.element);
  }
  static showGameScreen(playerName) {
    const gameScreen = new GamePresenter(new GameModel(playerName, gameData));
    renderScreen(gameScreen.element);
    gameScreen.start();
  }
  static showError(error) {
    const errorView = new ErrorView(error);
    renderScreen(errorView.element);
  }
  static showStats(model, username) {
    const statsScreenView = new StatsScreenPresenter(model, username);
    Loader.saveResults(model, username).
         then(() => Loader.loadResults(username)).
         then((data) => statsScreenView.showScores(data)).
         then(() => renderScreen(statsScreenView.element)).
         catch(Router.showError);
  }
}

import IntroScreen from './presenters/introPresenter';
import GreetingScreen from './presenters/greetingPresenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rulesPresenter';
import StatsScreenPresenter from './presenters/statsScreenPresenter';
import GamePresenter from './presenters/GamePresenter';
import ErrorView from './views/error-screen';
import ModalView from './views/modal-confirm';
import GameModel from './gameModel';
import {adaptServerData} from './utils/game-utils';
import Loader from './loader';

const ResponseTypes = {
  MIN_NUMBER: 200,
  MAX_NUMBER: 300
};
const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.status >= ResponseTypes.MIN_NUMBER && response.status < ResponseTypes.MAX_NUMBER) {
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

  static showModalWindow(onBackButton) {
    const wrapper = document.querySelector(`.central`);
    const confirmScreen = new ModalView();
    const modalElement = confirmScreen.element;
    confirmScreen.onClose = confirmScreen.onCancel = () => {
      wrapper.removeChild(modalElement);
    };
    confirmScreen.onSubmit = onBackButton;
    wrapper.appendChild(modalElement);
  }

  static showStats(model, playerName) {
    const statsScreenView = new StatsScreenPresenter(model, playerName);
    Loader.saveResults(model, playerName).
         then(() => Loader.loadResults(playerName)).
         then((data) => statsScreenView.showScores(data)).
         then(() => renderScreen(statsScreenView.element)).
         catch(Router.showError);
  }

}

import IntroScreen from './presenters/intro-presenter';
import GreetingScreen from './presenters/greeting-presenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rules-presenter';
import StatsScreenPresenter from './presenters/stats-screen-presenter';
import GamePresenter from './presenters/game-presenter';
import ErrorView from './views/error-screen-view';
import ModalView from './views/modal-confirm-view';
import GameModel from './game-model';
import {adaptServerData} from './utils/game-utils';
import Loader from './loader';
const SERVER_URL = `https://es.dump.academy/pixel-hunter/questions`;
const ResponseTypes = {
  MIN_NUMBER: 200,
  MAX_NUMBER: 300
};


const checkStatus = (response) => {
  if (response.status >= ResponseTypes.MIN_NUMBER && response.status < ResponseTypes.MAX_NUMBER) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameDataElements;

export default class Router {
  static showIntro() {
    const introView = new IntroScreen();
    renderScreen(introView.element);
    window.fetch(SERVER_URL).
      then(checkStatus).
      then((response)=> response.json()).
      then((data) => {
        gameDataElements = adaptServerData(data);
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
    const gameScreen = new GamePresenter(new GameModel(playerName, gameDataElements));
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
         then((dataElements) => statsScreenView.showScores(dataElements)).
         then(() => renderScreen(statsScreenView.element)).
         catch(Router.showError);
  }

}

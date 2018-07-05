import IntroPresenter from './presenters/intro-presenter';
import GreetingPresenter from './presenters/greeting-presenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rules-presenter';
import StatsScreenPresenter from './presenters/stats-screen-presenter';
import GamePresenter from './presenters/game-presenter';
import ErrorView from './views/error-screen-view';
import ModalView from './views/modal-confirm-view';
import SpinnerView from './views/spinner-view';
import GameModel from './game-model';
import {adaptServerData} from './utils/game-utils';
import Loader from './loader';
import {preloadImages} from './loader';
import {SERVER_URL} from './loader';

const FadeTimes = {
  FADE_IN_TIME: 200,
  FADE_OUT_TIME: 2000
};

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

let gameDataComponents;

export default class Router {
  static showIntro() {
    const introView = new IntroPresenter();
    renderScreen(introView.element);
    Router.showSpinerLoader();
    window.fetch(`${SERVER_URL}/questions`).
      then(checkStatus).
      then((response)=> response.json()).
      then((data) => {
        gameDataComponents = adaptServerData(data);
      }).
      then(() => preloadImages(gameDataComponents)).
      then(() => introView.element.querySelector(`#intro`).classList.add(`fade-out`)).
      then(() => {
        setTimeout(() => Router.showGreetingScreen(), FadeTimes.FADE_OUT_TIME);
      }).
      catch((error) => Router.showError(error));
  }

  static showGreetingScreen() {
    const greetingScreenView = new GreetingPresenter();
    renderScreen(greetingScreenView.element);
    setTimeout(() => greetingScreenView.element.querySelector(`.greeting`).classList.add(`fade-in`), FadeTimes.FADE_IN_TIME);
  }

  static showSpinerLoader() {
    const spinnerLoader = new SpinnerView();
    document.querySelector(`.central`).appendChild(spinnerLoader.element);
  }

  static showRulesScreen() {
    const rulesScreenView = new RulesPresenter();
    renderScreen(rulesScreenView.element);
  }

  static showGameScreen(playerName) {
    const gameScreen = new GamePresenter(new GameModel(playerName, gameDataComponents));
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
    const modal = confirmScreen.element;
    confirmScreen.onClose = confirmScreen.onCancel = () => {
      wrapper.removeChild(modal);
    };
    confirmScreen.onSubmit = onBackButton;
    wrapper.appendChild(modal);
  }

  static showStats(model, playerName) {
    const statsScreenView = new StatsScreenPresenter(model, playerName);
    Router.showSpinerLoader();
    Loader.saveResults(model, playerName).
         then(() => Loader.loadResults(playerName)).
         then((dataComponents) => statsScreenView.showScores(dataComponents)).
         then(() => renderScreen(statsScreenView.element)).
         catch((error) => Router.showError(error));
  }

}

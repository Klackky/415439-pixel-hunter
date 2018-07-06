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
import Loader from './loader';
import {adaptServerData} from './utils/game-utils';
import {preloadImages} from './loader';
import {SERVER_URL} from './loader';
import {mainScreenContainer} from './utils/render-screen';
import {checkStatus} from './loader';

const FadeTimes = {
  FADE_IN_TIME: 200,
  FADE_OUT_TIME: 2000
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
    const greetingScreen = new GreetingPresenter();
    renderScreen(greetingScreen.element);
    setTimeout(() => greetingScreen.element.querySelector(`.greeting`).classList.add(`fade-in`), FadeTimes.FADE_IN_TIME);
  }

  static showSpinerLoader() {
    const spinnerLoader = new SpinnerView();
    mainScreenContainer.appendChild(spinnerLoader.element);
  }

  static showRulesScreen() {
    const rulesScreen = new RulesPresenter();
    renderScreen(rulesScreen.element);
  }

  static showGameScreen(playerName) {
    const gameScreen = new GamePresenter(new GameModel(playerName, gameDataComponents));
    renderScreen(gameScreen.element);
    gameScreen.start();
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    renderScreen(errorScreen.element);
  }

  static showModalWindow(onBackButton) {
    const confirmScreen = new ModalView();
    const modal = confirmScreen.element;
    confirmScreen.onClose = confirmScreen.onCancel = () => {
      mainScreenContainer.removeChild(modal);
    };
    confirmScreen.onSubmit = onBackButton;
    mainScreenContainer.appendChild(modal);
  }

  static showStats(model, playerName) {
    const statsScreen = new StatsScreenPresenter(model, playerName);
    Router.showSpinerLoader();
    Loader.saveResults(model, playerName).
         then(() => Loader.loadResults(playerName)).
         then((dataComponents) => statsScreen.showScores(dataComponents)).
         then(() => renderScreen(statsScreen.element)).
         catch((error) => Router.showError(error));
  }

}

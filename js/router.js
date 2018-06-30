import IntroScreen from './presenters/introPresenter';
import GreetingScreen from './presenters/greetingPresenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rulesPresenter';
import StatsScreenPresenter from './presenters/statsScreenPresenter';
import GamePresenter from './presenters/GamePresenter';
import GameModel from './gameModel';
import {adaptServerData} from './utils/game-utils';
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

    //  catch((err) => console.error(err)).
      then(() => Router.showGreetingScreen());
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
  static showStats(model) {
    const statsScreenView = new StatsScreenPresenter(model);
    renderScreen(statsScreenView.element);
  }
}

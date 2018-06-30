import IntroScreen from './presenters/introPresenter';
import GreetingScreen from './presenters/greetingPresenter';
import renderScreen from './utils/render-screen';
import RulesPresenter from './presenters/rulesPresenter';
import StatsScreenPresenter from './presenters/statsScreenPresenter';
import GamePresenter from './presenters/GamePresenter';
import GameModel from './gameModel';
export default class Router {
  static showIntro() {
    const introView = new IntroScreen();
    renderScreen(introView.element);
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
    const gameScreen = new GamePresenter(new GameModel(playerName));
    renderScreen(gameScreen.element);
    gameScreen.start();
  }
  static showStats(model) {
    const statsScreenView = new StatsScreenPresenter(model);
    renderScreen(statsScreenView.element);
  }
}

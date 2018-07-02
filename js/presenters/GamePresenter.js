import GameScreen from '../views/gameScreenView';
import HeaderTemplate from '../templates/header';
import StatsBarTemplate from '../templates/statsElement';
import FooterTemplate from '../templates/footer';
import {GameStandarts} from '../game-consts';
import Router from '../router';


class GamePresenter {
  constructor(model) {
    this.model = model;
    this.content = new GameScreen(this.model.getCurrentLevel());
    this.header = new HeaderTemplate(this.model.state);
    this.statsBar = new StatsBarTemplate(this.model.state);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.statsBar.element);
    this.root.appendChild(new FooterTemplate().element);
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onAnswer = this.onAnswer.bind(this);
    this.header.onBackButton = this.onBackButton.bind(this);
    this.startTimer();
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.onAnswer(false);
        this.changeLevel();
      }
      this.updateHeader();
    }, 1000);
  }

  onAnswer(isCorrect) {
    this.stopGame();
    this.model.state.answers.push({answer: isCorrect, time: GameStandarts.TIMER_TIME - this.model.state.time});
    if (!isCorrect) {
      --this.model.state.lives;
    }
    if (this.model.state.lives === GameStandarts.MIN_LIVES || this.model.state.level === GameStandarts.MAX_LEVEL) {
      Router.showStats(this.model.state, `vasya`);
    } else {
      this.changeLevel();
    }
  }

  onBackButton() {
    Router.showGreetingScreen();
    this.model.restart();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  restartGame() {
    this.model.restart();
  }

  changeLevel() {
    this.model.restartTimer();
    this.startTimer();
    this.updateHeader();
    this.updateStatsBar();
    const nextLevel = new GameScreen(this.model.nextLevel());
    nextLevel.onAnswer = this.onAnswer.bind(this);
    this.updateView(nextLevel);
  }

  updateView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }

  updateHeader() {
    const header = new HeaderTemplate(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBackButton = this.onBackButton.bind(this);
  }

  updateStatsBar() {
    const statsBar = new StatsBarTemplate(this.model.state);
    this.root.replaceChild(statsBar.element, this.statsBar.element);
    this.statsBar = statsBar;
  }
}
export default GamePresenter;

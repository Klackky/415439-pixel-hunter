import GameScreen from '../views/gameScreenView';
import HeaderTemplate from '../views/header';
import FooterTemplate from '../templates/footer';
import {GameStandarts} from '../game-consts';
// import resizeImages from '../utils/resize';
import {resizeRenderedImages} from '../utils/resize';
import Router from '../router';
const ONE_SECOND = 1000;

class GamePresenter {
  constructor(model) {
    this.model = model;
    this.content = new GameScreen(this.model.getCurrentLevel(), this.model.state);
    this.header = new HeaderTemplate(this.model.state);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(new FooterTemplate().element);
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onAnswer = this.onAnswer.bind(this);
    this.header.onBackButton = this.onBackButton.bind(this);
    resizeRenderedImages(this.element);
    this.startTimer();
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.onAnswer(false);
        this.changeLevel();
      }
      this.header.blinkTimer(this.model.state.time);
    }, ONE_SECOND);
  }

  onAnswer(isCorrect) {
    this.stopGame();
    this.model.state.answers.push({answer: isCorrect, time: GameStandarts.TIMER_TIME - this.model.state.time});
    if (!isCorrect) {
      --this.model.state.lives;
    }
    if (this.model.state.lives === GameStandarts.MIN_LIVES || this.model.state.level === GameStandarts.MAX_LEVEL) {
      this.model.endGame();
      this.stopGame();
    } else {
      this.changeLevel();
    }
  }

  onBackButton() {
    this.stopGame();
    Router.showModalWindow();
    this.model.restart();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  restartGame() {
    this.stopGame();
    this.model.restart();
  }

  changeLevel() {
    this.stopGame();
    this.model.restartTimer();
    this.updateHeader();
    this.startTimer();
    const nextLevel = new GameScreen(this.model.nextLevel(), this.model.state);
    nextLevel.onAnswer = this.onAnswer.bind(this);
    this.updateView(nextLevel);
  }

  updateView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    resizeRenderedImages(view.element);
  }

  updateHeader() {
    const header = new HeaderTemplate(this.model.state, this.model.time);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBackButton = this.onBackButton.bind(this);
  }

}
export default GamePresenter;

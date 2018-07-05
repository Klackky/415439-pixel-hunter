import GameScreen from '../views/game-screen-view';
import HeaderTemplate from '../views/header-view';
import FooterTemplate from '../templates/footer';
import Router from '../router';
import {GameStandarts} from '../game-consts';
import {resizeRenderedImages} from '../utils/resize';
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
    this._startTimer();
  }

  _startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.onAnswer(false);
      }
      this.header.blinkTimer(this.model.state.time);
    }, ONE_SECOND);
  }

  _stop() {
    clearInterval(this._interval);
  }

  _changeLevel() {
    this._stop();
    this.model.restartTimer();
    this._updateHeader();
    this._startTimer();
    const nextLevel = new GameScreen(this.model.getNextLevel(), this.model.state);
    nextLevel.onAnswer = this.onAnswer.bind(this);
    this._updateView(nextLevel);
  }

  _updateView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
    resizeRenderedImages(view.element);
  }

  _updateHeader() {
    const header = new HeaderTemplate(this.model.state, this.model.time);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
    this.header.onBackButton = this.onBackButton.bind(this);
  }

  onBackButton() {
    this._stop();
    Router.showModalWindow();
    this.model.restart();
  }

  onAnswer(isCorrect) {
    this._stop();
    this.model.state.answers.push({answer: isCorrect, time: GameStandarts.TIMER_TIME - this.model.state.time});
    if (!isCorrect) {
      --this.model.state.lives;
    }
    if (this.model.state.lives === GameStandarts.MIN_LIVES || this.model.state.level === GameStandarts.MAX_LEVEL) {
      this.model.endGame();
      this._stop();
    } else {
      this._changeLevel();
    }
  }

}
export default GamePresenter;

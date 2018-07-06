import Router from './router';
import {gameReset} from './utils/game-utils';
import {GameStandarts} from './game-consts';

class GameModel {
  constructor(name, gameDataElements) {
    this._data = gameDataElements;
    this._name = name;
    this.restart();
  }

  get state() {
    return this._state;
  }

  getNextLevel() {
    return this._data[++this._state.level];
  }

  getCurrentLevel() {
    return this._data[this._state.level];
  }

  tick() {
    this._timer = this._state.time--;
  }

  endGame() {
    Router.showStats(this._state, this._name);
  }

  restartTimer() {
    this._state.time = GameStandarts.TIMER_TIME;
  }

  restart() {
    this._state = gameReset();
  }

}
export default GameModel;

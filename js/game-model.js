import {gameReset} from './utils/game-utils';
import {GameStandarts} from './game-consts';
import Router from './router';

class GameModel {
  constructor(name, gameDataElements) {
    this.data = gameDataElements;
    this.name = name;
    this._restart();
  }
  get state() {
    return this._state;
  }
  nextLevel() {
    return this.data[++this.state.level];
  }
  getCurrentLevel() {
    return this.data[this._state.level];
  }
  _restart() {
    this._state = gameReset();
  }
  tick() {
    this._timer = this._state.time--;
  }
  endGame() {
    Router.showStats(this._state, this.name);
  }
  restartTimer() {
    this._state.time = GameStandarts.TIMER_TIME;
  }

}
export default GameModel;

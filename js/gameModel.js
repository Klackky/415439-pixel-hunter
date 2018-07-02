import {gameReset} from './utils/game-utils';
import {GameStandarts} from './game-consts';
import Router from './router';

class GameModel {
  constructor(name, gameData) {
    this.data = gameData;
    this.name = name;
    this.restart();
  }
  get state() {
    return this._state;
  }
  get answers() {
    return this._state.answers;
  }
  changeLevel(state) {
    return this.data[++state.level];
  }
  restart() {
    this._state = gameReset();
  }
  get getLevel() {
    return this.data[this._state.level];
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
  nextLevel() {
    return this.data[++this.state.level];
  }
  getCurrentLevel() {
    return this.data[this._state.level];
  }
}
export default GameModel;

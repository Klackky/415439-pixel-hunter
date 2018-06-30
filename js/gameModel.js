import {gameReset} from './utils/game-utils';
import data from './data/answers';
const changeLevel = (state) => {
  return data[++state.level];
};
const getLevel = (state) => data[state.level];
class GameModel {
  constructor(name) {
    this.name = name;
    this.restart();
  }
  get state() {
    return this._state;
  }
  get lives() {
    return this._state.lives;
  }
  get answers() {
    return this._state.answers;
  }
  restart() {
    this._state = gameReset();
  }
  tick() {
    this._timer = this._state.time--;
  }
  restartTimer() {
    this._state.time = 30;
  }
  isDead() {
    return this._state.lives <= 0;
  }
  lastLevel() {
    return getLevel(this._state + 1) === void 0;
  }
  nextLevel() {
    return changeLevel(this._state);
  }
  getCurrentLevel() {
    return getLevel(this._state);
  }
}
export default GameModel;

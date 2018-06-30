import {gameReset} from './utils/game-utils';
// import data from './data/answers';
// const changeLevel = (state) => {
//  return data[++state.level];
// };
// const getLevel = (state) => data[state.level];
class GameModel {
  constructor(name, gameData) {
    this.data = gameData;
    this.name = name;
    this.restart();
  //  console.log(this.data.level);
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
  restartTimer() {
    this._state.time = 30;
  }
  isDead() {
    return this._state.lives <= 0;
  }
  //  lastLevel() {
  //  return this.getLevel(this._state + 1) === void 0;
  //  }
  nextLevel() {
    return this.data[++this.state.level];
  //  return this.changeLevel(this._state);
  }
  getCurrentLevel() {
    return this.data[this._state.level];
  //  return this.getLevel(this._state);
  }
}
export default GameModel;

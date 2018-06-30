import Router from '../router';
import StatsScreen from '../views/stats';
import {previousGames} from '../data/gameData';

export default class StatsScreenPresenter {
  constructor(state) {
    this.state = state;
    this.content = new StatsScreen(this.state);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onBackButton = this.onBackButton.bind(this);
  }

  onBackButton() {
    previousGames.push(this.state);
    Router.showGreetingScreen();
  }
}

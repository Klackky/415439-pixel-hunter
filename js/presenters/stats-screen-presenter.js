import Router from '../router';
import StatsScreen from '../views/stats-screen-view';
import HeaderTemplate from '../views/header-view';

export default class StatsScreenPresenter {
  constructor(state) {
    this.state = state;
    this.header = new HeaderTemplate();
    this.content = new StatsScreen(this.state);
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.header.onBackButton = this.onBackButton.bind(this);
  }

  showScores(scores) {
    this.content.showScores(scores);
  }

  onBackButton() {
    Router.showGreetingScreen();
  }
}

import Router from '../router';
import StatsScreen from '../views/stats-screen-view';

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

  showScores(scores) {
    this.content.showScores(scores);
  }

  onBackButton() {
    Router.showGreetingScreen();
  }
}

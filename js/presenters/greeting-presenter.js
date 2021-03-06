import Router from '../router';
import GreetingView from '../views/greeting-screen-view';

export default class GreetingPresenter {
  constructor() {
    this.content = new GreetingView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onArrow = this.onArrow.bind(this);
  }

  onArrow() {
    Router.showRulesScreen();
  }

  onBackButton() {
    Router.showGreetingScreen();
  }
}

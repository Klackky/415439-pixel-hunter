import Router from '../router';
import GreetingScreen from '../views/greeting';

export default class GreetingPresenter {
  constructor() {
    this.content = new GreetingScreen();
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
}

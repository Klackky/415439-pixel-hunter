import Router from '../router';
import RulesView from '../views/rules-screen-view';
export default class RulesScreen {
  constructor() {
    this.content = new RulesView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(name) {
    Router.showGameScreen(name);
  }
}

import Router from '../router';
import RulesView from '../views/rules-screen-view';
import HeaderTemplate from '../views/header-view';

export default class RulesPresenter {
  constructor() {
    this.content = new RulesView();
    this.header = new HeaderTemplate();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onSubmit = this.onSubmit.bind(this);
    this.header.onBackButton = this.onBackButton.bind(this);
  }

  onSubmit(name) {
    Router.showGameScreen(name);
  }

  onBackButton() {
    Router.showGreetingScreen();
  }
}

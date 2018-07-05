import Router from '../router';
import IntroScreen from '../views/intro-view';

export default class IntroPresenter {
  constructor() {
    this.content = new IntroScreen();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.start();
  }

  get element() {
    return this.root;
  }

  start() {
    this.content.onClick = this.onClick.bind(this);
  }

  onClick() {
    Router.showGreetingScreen();
  }
}

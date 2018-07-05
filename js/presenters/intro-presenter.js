import Router from '../router';
import IntroView from '../views/intro-view';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
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

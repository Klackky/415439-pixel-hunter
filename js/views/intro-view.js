import AbstractView from '../abstract-view';
import FooterTemplate from '../templates/footer';
export default class IntroScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
    ${new FooterTemplate().template}`;
  }

  onClick() {

  }

  bind(element) {
    const playButton = element.querySelector(`.intro__asterisk`);
    playButton.addEventListener(`click`, () => {
      this.onClick();
    });
  }

}

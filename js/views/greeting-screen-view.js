import FooterTemplate from '../templates/footer';
import AbstractView from '../abstract-view';

export default class GreetingView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3> The best photorealism artists are challenging you!</h3>
          <p>The rules are simple.<br>
          You need to distinguish a painting from a photo and make a choice.<br>
          The task seams trivial, but do not think that everything is so simple. <br>
          Photorealism could be deceptive and cunning. <br>
          Remember, most importantly - to look very attentively. </p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
      ${new FooterTemplate().template}`;
  }

  onArrow() {

  }

  bind(element) {
    const nextArrow = element.querySelector(`.greeting__continue`);
    nextArrow.addEventListener(`click`, () => {
      this.onArrow();
    });
  }
}

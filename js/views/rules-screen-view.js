import AbstractView from '../abstract-view';
import FooterTemplate from '../templates/footer';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="rules">
      <h1 class="rules__title">Rules</h1>
      <p class="rules__description"> You have 10 tries to guess either a photo <img
        src="img/photo_icon.png" width="16" height="16"> or a painting <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        You can have multiple photos or paintings displayed at the same time <br>
        You have 30 seconds to make a guess with additional time bonus for a quick answer.<br>
        The maximum number of mistakes is 3. <br>
        Are you ready to rock?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Your name">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
  ${new FooterTemplate().template}`;
  }

  onSubmit() {

  }


  onBackButton() {

  }

  bind(element) {
    const nameInput = element.querySelector(`.rules__input`);
    const submitButton = element.querySelector(`.rules__button`);
    nameInput.addEventListener(`input`, () => {
      submitButton.disabled = false;
    });
    submitButton.addEventListener(`click`, () => {
      const name = nameInput.value;
      this.onSubmit(name);
      submitButton.disabled = true;
    });
  }
}

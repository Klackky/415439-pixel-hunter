import AbstractView from '../abstract-view';
import {arrowBack} from '../views/header';
import FooterTemplate from '../templates/footer';
export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<header class="header">
      ${arrowBack}
    </header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
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
    const inputForm = element.querySelector(`.rules__input`);
    const backButton = element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onBackButton();
    });
    const submitButton = element.querySelector(`.rules__button`);
    const submitForm = element.querySelector(`.rules__form`);
    submitForm.addEventListener(`input`, () => {
      submitButton.disabled = false;
    });
    submitButton.addEventListener(`click`, () => {
      const name = inputForm.value;
      this.onSubmit(name);
      submitButton.disabled = true;
    });
  }
}

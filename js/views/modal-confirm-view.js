import AbstractView from '../abstract-view';
import FooterTemplate from '../templates/footer';

export default class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="modal-confirm modal-confirm__wrap">
      <form class="modal-confirm__inner">
        <button class="modal-confirm__close" type="button">Закрыть</button>
        <h2 class="modal-confirm__title">Подтверждение</h2>
        <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn button-submit">Ок</button>
          <button class="modal-confirm__btn button-cancel">Отмена</button>
        </div>
      </form>
    </section>
    ${new FooterTemplate().template}`;
  }

  onPositiveClick() {

  }

  onCancel() {

  }

  onClose() {

  }

  bind(element) {
    const closeButton = element.querySelector(`.modal-confirm__close`);
    closeButton.addEventListener(`click`, () => {
      this.onClose();
    });
    const okButton = element.querySelector(`.button-submit`);
    okButton.addEventListener(`click`, () => {
      this.onPositiveClick();
    });
    const cancelButton = element.querySelector(`.button-cancel`);
    cancelButton.addEventListener(`click`, () => {
      this.onCancel();
    });

  }
}

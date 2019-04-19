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
        <h2 class="modal-confirm__title">Confirmation</h2>
        <p class="modal-confirm__text">Are you sure that you want to start over?</p>
        <div class="modal-confirm__btn-wrap">
          <button class="modal-confirm__btn button-submit">Ok</button>
          <button class="modal-confirm__btn button-cancel">Cancel</button>
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
    const submitButton = element.querySelector(`.button-submit`);
    submitButton.addEventListener(`click`, () => {
      this.onPositiveClick();
    });
    const cancelButton = element.querySelector(`.button-cancel`);
    cancelButton.addEventListener(`click`, () => {
      this.onCancel();
    });

  }
}

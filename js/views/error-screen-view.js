import AbstractView from '../abstract-view';
import FooterTemplate from '../templates/footer';
export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }


  get template() {
    return `<section class="modal-error modal-error__wrap">
     <div class="modal-error__inner">
       <h2 class="modal-error__title">${this.error.name}</h2>
       <p class="modal-error__text">${this.error.message}</p>
     </div>
   </section>
      ${new FooterTemplate().template}`;
  }

}

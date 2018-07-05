import AbstractView from '../abstract-view';
export default class SpinnerView extends AbstractView {
  constructor() {
    super();
  }


  get template() {
    return `
  <div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <div class = "preloader-text"> Идет загрузка данных <span>.</span><span>.</span><span>.</span> </div>
`;
  }

}

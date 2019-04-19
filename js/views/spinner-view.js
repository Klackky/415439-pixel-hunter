import AbstractView from '../abstract-view';
export default class SpinnerView extends AbstractView {
  constructor() {
    super();
  }


  get template() {
    return `
  <div class="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <div class = "preloader-text"> Loading... <span>.</span><span>.</span><span>.</span> </div>
`;
  }

}

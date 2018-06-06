import introScreen from './screens/intro';
import renderScreen from './utils/render-screen';
renderScreen(introScreen);

const ARROWS_MARKUP = `
<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>
`;

document.body.insertAdjacentHTML(`beforeend`, ARROWS_MARKUP);

const buttons = document.querySelectorAll(`.arrows__btn`);
buttons[0].dataset.Id = 0;
buttons[1].dataset.Id = 1;

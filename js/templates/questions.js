/**
 * Function selects which level we need to render
 *
 * @function renderQuestions
 * @param {object} level current level
 * @return {string} string we`re appending to the dom
 */
const renderQuestions = (level) => {
  if (level.type === `two-of-two` || level.type === `tinder-like`) {
    return `
    <form class="game__content ${level.type === `tinder-like` ? `game__content--wide` : ``}">
    ${level.answers.map((question, index) => `<div class="game__option ${question.type}">
          <img src="${question.image.url}" alt="Option ${index}" ${level.type === `two-of-two` ? `width="468" height="458"` : `width="705" height="455"`}>
          <span class="tooltiptext">${question.type}</span>
          <label class="game__answer game__answer--photo">
            <input name="question${index}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint ">
            <input name="question${index}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)
}</form>`;
  }
  return `
  <form class="game__content  game__content--triple">
  ${level.answers.map((question, index) => `<div class="game__option ${question.type}">
          <img src="${question.image.url}" alt="Option ${index}" width="304" height="455">
          <span class="tooltiptext">${question.type}</span>
        </div>`).join(``)
}</form>
`;

};

export default renderQuestions;

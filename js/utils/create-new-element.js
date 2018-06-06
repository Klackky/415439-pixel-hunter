/**
 * DOM from string
 *
 * @function createNewDomElement
 * @param {string} string we`re converting to a DOM element
 * @return {element} new DOM element
 */
const createNewDomElement = (string) => {
  const template = document.createElement(`div`);
  template.innerHTML = string.trim();
  return template;
};
export default createNewDomElement;

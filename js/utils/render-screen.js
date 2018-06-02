const renderScreen = (screen) => {
  const MAIN_SCREEN_CONTAINER = document.querySelector(`.central`);
  MAIN_SCREEN_CONTAINER.innerHTML = ``;
  MAIN_SCREEN_CONTAINER.appendChild(screen);
};
export default renderScreen;

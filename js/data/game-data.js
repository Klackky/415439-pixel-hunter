const INITIAL_GAME_STATE = {
  lives: 3,
  time: 30,
  level: 0,
  answers: [],
};
Object.freeze(INITIAL_GAME_STATE);
export const adaptServerData = (data) => {
  return data;
};
export default INITIAL_GAME_STATE;

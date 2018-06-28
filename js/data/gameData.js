const INITIAL_GAME_STATE = {
  lives: 3,
  time: 300,
  level: 0,
  answers: [],
  games: []
};
Object.freeze(INITIAL_GAME_STATE);

export const playerData = Object.assign({}, INITIAL_GAME_STATE);
export default INITIAL_GAME_STATE;

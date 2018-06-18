import INITIAL_GAME_STATE from '../data/gameData';
export const gameReset = () => {
  INITIAL_GAME_STATE.level = 0;
  INITIAL_GAME_STATE.answers = [];
  INITIAL_GAME_STATE.lives = 3;
};

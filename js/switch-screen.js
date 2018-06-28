import INITIAL_GAME_STATE from './data/gameData';
import Intro from './views/intro';
import RulesScreen from './views/rules';
import renderScreen from './utils/render-screen';
import GameScreen from './views/gameScreenView';
import GreetingScreen from './views/greeting';
import StatsScreen from './views/stats';
import {playerData} from './data/gameData';
import {gameReset} from './utils/game-utils';

const GAME_STANDARTS = {
  minLives: 0,
  maxLevel: 9
};

export const renderIntroScreen = () => {
  const introView = new Intro();
  renderScreen(introView.element);
  introView.onClick = () => {
    renderRulesScreen();
  };
};

const renderRulesScreen = () => {
  const rulesView = new RulesScreen();
  renderScreen(rulesView.element);
  rulesView.onSubmit = () =>{
    renderGameScreen(INITIAL_GAME_STATE);
  };
  rulesView.onBackButton = () => {
    renderGreetingScreen();
    playerData.games.push({answers: playerData.answers, lives: playerData.lives});
    gameReset();
  };
};

const renderGameScreen = (state) => {
  const gameScreenView = new GameScreen(state);
  renderScreen(gameScreenView.element);
  gameScreenView.onAnswer = (isCorrect)=> {
    playerData.answers.push({answer: isCorrect, time: 15});
    if (!isCorrect) {
      --playerData.lives;
    }
    if (state.lives === GAME_STANDARTS.minLives || state.level === GAME_STANDARTS.maxLevel) {
      renderStatsScreen(state);
    } else {
      ++playerData.level;
      renderGameScreen(playerData);
    }
  };
  gameScreenView.onBackButton = () => {
    renderGreetingScreen();
    playerData.games.push({answers: playerData.answers, lives: playerData.lives});
    gameReset();
  };
};

const renderStatsScreen = (state) => {
  const statsScreenView = new StatsScreen(state);
  renderScreen(statsScreenView.element);
  statsScreenView.onBackButton = () => {
    renderGreetingScreen();
    playerData.games.push({answers: playerData.answers, lives: playerData.lives});
    gameReset();
  };
};

const renderGreetingScreen = () => {
  const greetingScreenView = new GreetingScreen();
  renderScreen(greetingScreenView.element);
  greetingScreenView.onArrow = () => {
    renderRulesScreen();
  };
};

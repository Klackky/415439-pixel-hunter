import Router from './router';
export const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const DEFAULT_NAME = `Default name`;
const APP_ID = 19870714;


const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export default class Loader {
  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }

}

export const preloadImages = (gameLevels) => {
  const promises = [];
  for (const level of gameLevels) {
    for (const answer of level.answers) {
      promises.push(new Promise((resolve) => {
        const newImage = new Image();
        newImage.addEventListener(`load`, () => {
          resolve(newImage.onload = null);
        });
        newImage.addEventListener(`error`, () => {
          newImage.onerror = null;
          Router.showError(`Can't load image: ${newImage.src}`);
        });
        newImage.src = answer.image.url;
      }));
    }
  }
  return Promise.all(promises);
};

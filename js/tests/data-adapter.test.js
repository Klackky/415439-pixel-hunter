import {assert} from 'chai';
import {adaptServerData} from '../utils/game-utils';
const localData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        "image": {
          "url": `http://imgur.com/18zh0az.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `paint`
      }, {
        "image": {
          "url": `http://imgur.com/18zh0az.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      }
    ]
  }
];


const serverData = [
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers":
    [
      {
        "image": {
          "url": `http://imgur.com/18zh0az.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://imgur.com/18zh0az.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      }
    ]
  }
];

describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, adaptServerData(serverData));
  });

});

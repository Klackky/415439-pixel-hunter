const images = {
  paints: [
    `https://i.imgur.com/c1HoQia.jpg`,
    `https://i.pinimg.com/originals/29/10/e7/2910e7e3c605a66b88e98de63f6d829b.jpg`,
    `https://artlogic-res.cloudinary.com/c_limit,f_auto,fl_lossy/ws-pelham/usr/library/main/images/georges_braque-_1918-_rhum_et_guitare-_oil_on_canvas-_60_x_73_cm-_abell-_collection-_madrid.jpg`,
    `https://waldinadotcom.files.wordpress.com/2016/05/georges-braque-studio-avec-crane.jpg?w=1400&h=&crop=1`,
    `https://www.dalipaintings.com/images/paintings/the-temptation-of-saint-anthony.jpg`,
    `https://www.hollandgeschenkpakket.nl/userdata/artikelen/servetten-vermeer-meisje-met-de-parel_5260_1_G.jpg`,
    `https://silverandexact.files.wordpress.com/2011/02/the-dance-lesson-edgar-degas-1876.jpg`
  ],
  photos: [
    `https://i.pinimg.com/564x/9c/b7/8a/9cb78acfad7e6364b31e955b5c0abe72.jpg`,
    `http://www.thisiscolossal.com/wp-content/uploads/2016/07/2016-summer-firefly-selects-spoon-and-tamago-1.jpg`,
    `https://i.pinimg.com/564x/dc/f2/7c/dcf27c9fa5e0e5ccf9e2054c9de728fc.jpg`,
    `https://i.pinimg.com/564x/73/5b/7d/735b7d3b975fcdef48d841bc80aed743.jpg`,
    `https://i.pinimg.com/564x/ed/7b/b5/ed7bb581fc3383cc58a3467d487a71b6.jpg`,
    `https://i.pinimg.com/564x/4e/1f/8c/4e1f8cafe46e2fe16ab94c4f91f6f317.jpg`,
    `https://i.pinimg.com/564x/97/8a/10/978a1073c0242474541c55a614fc8adb.jpg`,
    `https://i.pinimg.com/564x/e5/80/67/e580674eaf690007c7bd9f4590a1a564.jpg`,
    `https://i.pinimg.com/564x/63/ae/06/63ae0646ff3b6efd1719a9a0a9cbc92a.jpg`,
    `http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7odkrFJckdiFeHvab0GWOfzhj7tYdC0uglagsDNfPyWZlznP4Qbf55UAi-bRoFO_Dm2gxhauBfN2BeXIB45ZZzNK0dOwD7vL-uVm20_q5G80R-XJG9enxqDUlj6YX0f1F6lgerB1R6qm5nufjQ8NmtIZ86BeskAqqFDVV9icl5LLKMPIp75Eo3QFqXwJPhnkA1fg9in6fpPZLX5Vfw/`,
    `https://i.pinimg.com/564x/95/c2/a2/95c2a2cbd67afab7232f58f851ef6bf7.jpg`,
    `https://i.pinimg.com/564x/cc/b7/b5/ccb7b5271536426a59fbb3bd057f3427.jpg`,
    `https://i.pinimg.com/564x/7c/30/04/7c30049b48b1b225e1267312fca06fc7.jpg`
  ]
};

const levelTask = {
  game1: `Угадайте для каждого изображения фото или рисунок?`,
  game2: `Угадай, фото или рисунок?`,
  game3: `Найдите рисунок среди изображений`
};

const data = [
  {
    gameType: `game1`,
    task: levelTask.game1,
    questions: [
      {
        src: images.paints[0],
        type: `paint`
      }, {
        src: images.photos[0],
        type: `photo`
      }
    ]
  }, {
    gameType: `game2`,
    task: levelTask.game2,
    questions: [
      {
        src: images.photos[1],
        type: `photo`
      }
    ]
  }, {
    gameType: `game3`,
    task: levelTask.game3,
    questions: [
      {
        src: images.paints[1],
        type: `paint`
      }, {
        src: images.photos[2],
        type: `photo`
      }, {
        src: images.photos[3],
        type: `photo`
      },
    ]
  }, {
    gameType: `game1`,
    task: levelTask.game1,
    questions: [
      {
        src: images.paints[2],
        type: `paint`
      }, {
        src: images.photos[4],
        type: `photo`
      }
    ]
  }, {
    gameType: `game2`,
    task: levelTask.game2,
    questions: [
      {
        src: images.photos[5],
        type: `photo`
      }
    ]
  }, {
    gameType: `game3`,
    task: levelTask.game3,
    questions: [
      {
        src: images.photos[6],
        type: `photo`
      }, {
        src: images.paints[3],
        type: `paint`
      }, {
        src: images.photos[7],
        type: `photo`
      },
    ]
  }, {
    gameType: `game1`,
    task: levelTask.game1,
    questions: [
      {
        src: images.paints[4],
        type: `paint`
      }, {
        src: images.photos[8],
        type: `photo`
      }
    ]
  }, {
    gameType: `game2`,
    task: levelTask.game2,
    questions: [
      {
        src: images.photos[9],
        type: `photo`
      }
    ]
  }, {
    gameType: `game3`,
    task: levelTask.game3,
    questions: [
      {
        src: images.photos[10],
        type: `photo`
      }, {
        src: images.photos[11],
        type: `photo`
      }, {
        src: images.paints[5],
        type: `paint`
      },
    ]
  }, {
    gameType: `game1`,
    task: levelTask.game1,
    questions: [
      {
        src: images.paints[6],
        type: `paint`
      }, {
        src: images.photos[12],
        type: `photo`
      }
    ]
  }
];
export default data;

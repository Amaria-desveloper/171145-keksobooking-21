'use strict';

(function () {
  /*
  * Создание одного случайного объявления.
  * @param {number} widthMap - ширина карты.
  * @param {number} widthPin - ширина Пина.
  * @return {Object} {} - объект с данными для объявления.
  */
  const getRandomInteger = window.random.getInteger;
  const getRandomArrIndex = window.random.getArrIndex;
  const getRandomArr = window.random.getArr;
  const NUMBER_OF_AVATARS = window.constants.NUMBER_OF_AVATARS;
  const TYPES = window.constants.TYPES;
  const CAPACITY = window.constants.CAPACITY;
  const TIME_IN = window.constants.TIME_IN;
  const TIME_OUT = TIME_IN;
  const FEATURES = window.constants.FEATURES;
  const PHOTOS = window.constants.PHOTOS;


  function getAdvert(widthMap, widthPin) {
    return {
      "author": {
        "avatar": getRandomArrIndex(window.getAvatars(NUMBER_OF_AVATARS))
      },
      "offer": {
        "title": `Классное предложение`,
        "address": `0, 0`,
        "price": Math.round(getRandomInteger(1000, 5000) / 100) * 100,
        "type": getRandomArrIndex(Object.keys(TYPES)),
        "rooms": getRandomInteger(1, 3),
        "guests": getRandomArrIndex(CAPACITY),
        "checkin": getRandomArrIndex(TIME_IN),
        "checkout": getRandomArrIndex(TIME_OUT),
        "features": getRandomArr(FEATURES),
        "description": `Описание классного предложения`,
        "photos": getRandomArr(PHOTOS),
      },
      "location": {
        "x": getRandomInteger(0, (widthMap - widthPin)),
        "y": getRandomInteger(130, 630),
      }
    };
  }

  /*
  * Создание множества случайных объявлений
  * @param {Number} quantity - количество создаваемых объявлений.
  * @return {Array.<Object>} adverts - массив объектов с данными для объявлений.
  *
  */

  function getAdverts(quantity) {
    const widthMap = window.util.sizeOfElement.getWidth(document.querySelector(`.map`));
    const widthPin = window.util.sizeOfElement.getWidth(document.querySelector(`.map__pin`));

    let adverts = [];
    for (let i = 0; i < quantity; i++) {
      adverts.push(getAdvert(widthMap, widthPin));
    }
    return adverts;
  }

  window.adverts = getAdverts(NUMBER_OF_AVATARS);

})();

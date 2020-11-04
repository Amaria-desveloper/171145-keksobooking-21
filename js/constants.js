'use strict';

(function () {

  window.constants = {
    DATA_URL: `https://21.javascript.pages.academy/keksobooking/data`,
    URL_POST: `https://21.javascript.pages.academy/keksobooking`,
    TIMEOUT: 10000,

    TYPES: {
      flat: `Квартира`,
      house: `Дом`,
      palace: `Дворец`,
      bungalow: `Бунгало`
    },

    CAPACITY: [
      `для 1 гостя`,
      `для 2 гостей`,
      `для 3 гостей`,
      `не для гостей`
    ],

    TIME_IN: [
      `12:00`,
      `13:00`,
      `14:00`
    ],

    FEATURES: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`,
    ],

    DEPENCE_ROOM_GUESTS: {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    },

    TYPE_MIN_PRICE: {
      palace: `10000`,
      flat: `1000`,
      house: `5000`,
      bungalow: `0`
    }
  };

})();

'use strict';

(function () {

  window.constants = {
    NUMBER_OF_AVATARS: 8,

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

    PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
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

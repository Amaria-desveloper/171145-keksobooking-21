'use strict';
(function () {
/*
* Переменные, используемые в разных модулях.
*/
  function getVariables() {
    return {
      "map": {
        map: document.querySelector(`.map`),
        mapPins: document.querySelector(`.map__pins`),
        mapPin: document.querySelector(`.map__pin`),
        mapPinMain: document.querySelector(`.map__pin--main`)
      },
      "form": {
        adForm: document.querySelector(`.ad-form`),
        adFormFieldset: document.querySelectorAll(`.ad-form fieldset`),
        adFormAddress: document.querySelector(`#address`),
        adFormAvatar: document.querySelector(`#avatar`),
        adFormType: document.querySelector(`#type`),
        adFormPrice: document.querySelector(`#price`),
        adFormCapacity: document.querySelector(`#capacity`),
        adFormImages: document.querySelector(`#images`),
        adFormRoomNumber: document.querySelector(`#room_number`)
      }
    };
  }

  window.variables = getVariables();
})();


'use strict';

(function () {
  /*
  * Переключатель атрибута disabled
  */
  const makeDisabled = {
    "set": function (element) {
      for (let i = 0; i < element.length; i++) {
        element[i].setAttribute(`disabled`, true);
      }
    },
    "remove": function (element) {
      for (let i = 0; i < element.length; i++) {
        element[i].removeAttribute(`disabled`, true);
      }
    }
  };


  /*
  * Запускает активное состояние страницы с нужными установками.
  */
  function setActive() {
    const renderPins = window.pin.renderPins;
    const getOffset = window.util.getOffset;
    const installDefaultForm = window.form.installDefaultForm;
    const validateForm = window.validateForm.validate;
    const pinMap = document.querySelector(`.map__pins`);
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const adverts = window.adverts;

    installDefaultForm();

    validateForm();

    document.querySelector(`.map`).classList.remove(`map--faded`);
    document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);

    makeDisabled.remove(document.querySelectorAll(`.ad-form fieldset`));
    makeDisabled.remove(document.querySelectorAll(`.map__filters fieldset`));
    makeDisabled.remove(document.querySelectorAll(`.map__filters select`));

    pinMap.append(renderPins(pinTemplate, adverts, getOffset(document.querySelector(`.map__pin`))));
  }


  /*
  * Устанавливает вёрстку в инициализирующее состояние.
  */
  function setInactive() {
    document.querySelector(`.map`).classList.add(`map--faded`);
    document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
    makeDisabled.set(document.querySelectorAll(`.ad-form fieldset`));
    makeDisabled.set(document.querySelectorAll(`.map__filters fieldset`));
    makeDisabled.set(document.querySelectorAll(`.map__filters select`));
  }


  /*
  * Активирует сайт по событию на Метке.
  */
  function makeWork() {
    const getPositionOfElement = window.util.getPositionOfElement;
    const mapPinMain = document.querySelector(`.map__pin--main`);
    const setAddressValue = window.form.setAddressValue;

    const mapPinMainHandlerMousedown = function (evt) {
      if (evt.button === 0) {
        evt.preventDefault();
        setActive();
        mapPinMain.removeEventListener(`mousedown`, mapPinMainHandlerMousedown);
      }
    };

    const mapPinMainHandlerEnter = function (evt) {
      if (evt.key === `Enter`) {
        setActive();
        mapPinMain.removeEventListener(`keydown`, mapPinMainHandlerEnter);
      }
    };

    setAddressValue(document.querySelector(`#address`), getPositionOfElement(mapPinMain));

    mapPinMain.addEventListener(`mousedown`, mapPinMainHandlerMousedown);
    mapPinMain.addEventListener(`keydown`, mapPinMainHandlerEnter);
  }


  window.map = {
    setInactive,
    makeWork
  };

})();

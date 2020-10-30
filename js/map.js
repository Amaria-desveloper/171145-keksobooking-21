'use strict';

(function () {
  const renderPins = window.pin.renderPins;
  const getOffset = window.util.getOffset;
  const getCoordinateOfPinMain = window.util.getCoordinateOfPinMain;
  const getCoordinateCenterOfPinMain = window.util.getCoordinateCenterOfPinMain;
  const mapPinMainStartDrag = window.dragPinMain;

  const installDefaultForm = window.form.installDefaultForm;
  const setAddressValue = window.form.setAddressValue;
  const validateForm = window.validateForm.validate;

  const adverts = window.adverts;
  const map = window.variables.map.map;
  const mapPins = window.variables.map.mapPins;
  const mapPin = window.variables.map.mapPin;
  const mapPinMain = window.variables.map.mapPinMain;
  const adForm = window.variables.form.adForm;
  const adFormFieldset = window.variables.form.adFormFieldset;
  const adFormAddress = window.variables.form.adFormAddress;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapFiltersFieldset = document.querySelectorAll(`.map__filters fieldset`);
  const mapFiltersSelect = document.querySelectorAll(`.map__filters select`);


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
    installDefaultForm();
    validateForm();

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    makeDisabled.remove(adFormFieldset);
    makeDisabled.remove(mapFiltersFieldset);
    makeDisabled.remove(mapFiltersSelect);

    setAddressValue(adFormAddress, getCoordinateOfPinMain(mapPinMain));

    mapPins.append(renderPins(pinTemplate, adverts, getOffset(mapPin)));
  }


  /*
  * Устанавливает вёрстку в инициализирующее состояние.
  */
  function setInactive() {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    makeDisabled.set(adFormFieldset);
    makeDisabled.set(mapFiltersFieldset);
    makeDisabled.set(mapFiltersSelect);
  }


  /*
  * Активирует сайт по событию на Метке.
  */
  function makeWork() {
    setAddressValue(adFormAddress, getCoordinateCenterOfPinMain(mapPinMain));

    const mapPinMainClickHandler = function (evt) {
      evt.preventDefault();
      setActive();
      mapPinMain.removeEventListener(`click`, mapPinMainClickHandler);
      mapPinMain.addEventListener(`mousedown`, mapPinMainStartDrag);
    };

    mapPinMain.addEventListener(`click`, mapPinMainClickHandler);
  }


  window.map = {
    setInactive,
    makeWork
  };

})();

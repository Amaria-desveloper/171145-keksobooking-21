'use strict';

(function () {
  const getCoordinateCenterOfPinMain = window.util.getCoordinateCenterOfPinMain;
  const makeDisabled = window.util.makeDisabled;
  const load = window.backend.load;
  const successDataHandler = window.notices.successDataHandler;
  const errorDataHandler = window.notices.errorDataHandler;
  const removeCard = window.card.removeCard;
  const mapPinMainStartDrag = window.dragPinMain;
  const formReset = window.form.formReset;
  const installDefaultForm = window.form.installDefaultForm;
  const setAddressValue = window.form.setAddressValue;
  const validateForm = window.validateForm.validate;

  const map = window.variables.map.map;
  const mapPinMain = window.variables.map.mapPinMain;
  const adForm = window.variables.form.adForm;
  const adFormFieldset = window.variables.form.adFormFieldset;
  const adFormAddress = window.variables.form.adFormAddress;

  const mapFiltersFieldset = document.querySelectorAll(`.map__filters fieldset`);
  const mapFiltersSelect = document.querySelectorAll(`.map__filters select`);

  const backMapPinMain = {
    "left": mapPinMain.style.left,
    "top": mapPinMain.style.top,
  };


  function setActive() {
    installDefaultForm();
    validateForm();

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    makeDisabled.remove(adFormFieldset);
    makeDisabled.remove(mapFiltersFieldset);
    makeDisabled.remove(mapFiltersSelect);

    load(successDataHandler, errorDataHandler);

    mapPinMain.addEventListener(`mousedown`, mapPinMainStartDrag);
  }

  /*
  * Устанавливает вёрстку в инициализирующее состояние.
  */
  function setInactive() {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    formReset(adForm);
    makeDisabled.set(adFormFieldset);
    makeDisabled.set(mapFiltersFieldset);
    makeDisabled.set(mapFiltersSelect);
    removeCard();

    mapPinMain.style.left = backMapPinMain.left;
    mapPinMain.style.top = backMapPinMain.top;

    setAddressValue(adFormAddress, getCoordinateCenterOfPinMain(mapPinMain));
  }


  /*
  * Активирует сайт по событию на Метке.
  */
  function makeWork() {

    const mapPinMainClickHandler = function (evt) {
      evt.preventDefault();
      setActive();
      mapPinMain.removeEventListener(`click`, mapPinMainClickHandler);
    };

    mapPinMain.addEventListener(`click`, mapPinMainClickHandler);
  }


  window.map = {
    setInactive,
    makeWork,
  };
})();

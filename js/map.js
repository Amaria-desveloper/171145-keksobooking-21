'use strict';

const getCoordinateCenterOfPinMain = window.util.getCoordinateCenterOfPinMain;
const makeDisabled = window.util.makeDisabled;
const load = window.backend.load;
const successDataHandler = window.notices.successDataHandler;
const errorDataHandler = window.notices.errorDataHandler;
const removeCard = window.card.removeCard;
const mapPinMainMouseDownHandler = window.dragPinMain;
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


const setActive = () => {
  installDefaultForm();
  validateForm();

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  makeDisabled.remove(adFormFieldset);
  makeDisabled.remove(mapFiltersFieldset);
  makeDisabled.remove(mapFiltersSelect);

  load(successDataHandler, errorDataHandler);

  mapPinMain.addEventListener(`mousedown`, mapPinMainMouseDownHandler);
};

/*
* Устанавливает вёрстку в инициализирующее состояние.
*/
const setInactive = () => {
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
};


/*
* Активирует сайт по событию на Метке.
*/
const makeWork = () => {

  const mapPinMainClickHandler = function mapPinMainClickHandler(evt) {
    evt.preventDefault();
    setActive();
    mapPinMain.removeEventListener(`click`, mapPinMainClickHandler);
  };

  mapPinMain.addEventListener(`click`, mapPinMainClickHandler);
};


window.map = {
  setInactive,
  makeWork,
};

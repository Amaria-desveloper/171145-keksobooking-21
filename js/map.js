'use strict';

(function () {
  const getPositionOfElement = window.util.getPositionOfElement;
  const downloadData = window.backend.downloadData;
  const errorDataHandler = window.notices.errorDataHandler;
  const renderPins = window.pin.renderPins;
  const removeCard = window.card.removeCard;

  const formReset = window.form.formReset;
  const installDefaultForm = window.form.installDefaultForm;
  const setAddressValue = window.form.setAddressValue;
  const validateForm = window.validateForm.validate;
  const map = window.variables.map.map;
  const mapPins = window.variables.map.mapPins;
  const adForm = window.variables.form.adForm;
  const adFormFieldset = window.variables.form.adFormFieldset;
  const adFormAddress = window.variables.form.adFormAddress;


  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
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
  * В случае успешной загрузки данных с сервера...
  */
  const successDataHandler = function (data) {
    mapPins.append(renderPins(pinTemplate, data));
  };


  /*
  * ...Запускает активное состояние страницы с нужными установками (В случае успешной загрузки данных с сервера)
  */
  function setActive() {
    installDefaultForm();
    validateForm();

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    makeDisabled.remove(adFormFieldset);
    makeDisabled.remove(mapFiltersFieldset);
    makeDisabled.remove(mapFiltersSelect);

    downloadData(successDataHandler, errorDataHandler);
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
  }


  /*
  * Активирует сайт по событию на Метке.
  */
  function makeWork() {
    setAddressValue(adFormAddress, getPositionOfElement(mapPinMain));

    const mapPinMainClickHandler = function (evt) {
      evt.preventDefault();
      setActive();
      mapPinMain.removeEventListener(`click`, mapPinMainClickHandler);
    };

    mapPinMain.addEventListener(`click`, mapPinMainClickHandler);
  }


  window.map = {
    setInactive,
    makeWork
  };

})();

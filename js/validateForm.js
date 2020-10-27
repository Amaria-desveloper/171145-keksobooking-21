'use strict';
(function () {
  /*
  * Валидирует список. Если выполняется условие - сообщение об успехе, условие не выполняется - сообщение об ошибке.
  * @param {} condition
  * @param {} message
  * @param {} element
  */
  const makeCheckSelect = function (condition, message, element) {
    let error = function () {
      element.setCustomValidity(message);
      element.reportValidity();
    };
    let success = function () {
      element.setCustomValidity(``);
    };

    if (condition) {
      success();
    } else {
      error(message);
    }
  };


  /*
  * Проверка инпутов с двумя условиями. Условие один - нижний порог, условие два - верхний порог.
  * @param {} conditionOne
  * @param {} messageOne
  * @param {} conditionTwo
  * @param {} messageTwo
  * @param {} element - инпут, который проверяется.
  */
  const makeCheckInput = function (conditionOne, messageOne, conditionTwo, messageTwo, element) {

    let errorOne = function () {
      element.setCustomValidity(messageOne);
      element.reportValidity();
    };

    let errorTwo = function () {
      element.setCustomValidity(messageTwo);
      element.reportValidity();
    };

    let success = function () {
      element.setCustomValidity(``);
    };

    if (conditionOne) {
      errorOne();
    } else if (conditionTwo) {
      errorTwo();
    } else {
      success();
    }
  };


  /* отлов изменения поля Количество комнат. */
  const roomNumberChangeHandler = function (evt) {
    setCapacityValue(evt.target.value, evt.target, document.querySelector(`#capacity`));
  };


  /* отлов ввода текста в заголовок */
  const titleHandlerInput = function (evt) {
    makeCheckInput(evt.target.value.length < 30, `Заголовок объявления должен быть больше 30 символов`, evt.target.value.length > 100, `Заголовок объявления должен быть меньше 100 символов`, document.querySelector(`#title`));
  };


  /* отлов изменение заголовка */
  const avatarHandlerChange = function (evt) {
    window.form.showAvatarPreview(evt.target);
  };


  /* отлов загрузки изображений */
  const imagesHandlerChange = function (evt) {
    window.form.showImagesPreview(evt.target);
  };


  /* отлов изменения поля Тип жилья */
  const typeChangeHandler = function (evt) {
    setPriceValue(evt.target.value, document.querySelector(`#price`));
  };


  /* Устанавливает цену в плейсхолдер, проверяет введённую цену */
  const setPriceValue = function (value, element) {

    const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;

    element.setAttribute(`min`, TYPE_MIN_PRICE[value]);
    element.placeholder = TYPE_MIN_PRICE[value];
    const fieldPrice = document.querySelector(`#price`);

    const priceHandlerBlur = function (evt) {
      evt.preventDefault();
      makeCheckInput((fieldPrice.value > TYPE_MIN_PRICE[value] || ``), (`Цена не менее ` + TYPE_MIN_PRICE[value]), (document.querySelector(`#type`).value > 1000000), (`Цена не более 1 000 000`), fieldPrice);
    };

    fieldPrice.addEventListener(`blur`, priceHandlerBlur);
  };


  /* Устанавливает вместимость кол-во гостей */
  const setCapacityValue = function (selectedValue, selectedElement, setElement) {

    const DEPENCE_ROOM_GUESTS = window.constants.DEPENCE_ROOM_GUESTS;

    makeCheckSelect((DEPENCE_ROOM_GUESTS[selectedValue].includes(Number(setElement.value), 0)), `выберите допустимое количество гостей`, setElement);

    let selectedElementValue = selectedElement.querySelector(`option[value="` + [selectedValue] + `"]`);
    selectedElementValue.setAttribute(`selected`, `true`);

    for (let i = 0; i < setElement.length; i++) {
      setElement[i].setAttribute(`style`, `display: none`);
    }

    DEPENCE_ROOM_GUESTS[selectedValue].forEach(function (item) {
      setElement.querySelector(`option[value="` + item + `"]`).setAttribute(`style`, `display: auto`);
    });

    const capacityChangeHandler = function (evt) {
      evt.target.querySelector(`option[value="` + [evt.target.value] + `"]`).setAttribute(`selected`, `true`);
      setCapacityValue(selectedValue, selectedElement, setElement);
    };
    document.querySelector(`#capacity`).addEventListener(`change`, capacityChangeHandler);
  };


  /*
  * Слушает форму
  */
  function validate() {
    document.querySelector(`#room_number`).addEventListener(`change`, roomNumberChangeHandler);
    document.querySelector(`#title`).addEventListener(`input`, titleHandlerInput);
    document.querySelector(`#type`).addEventListener(`change`, typeChangeHandler);
    document.querySelector(`#avatar`).addEventListener(`change`, avatarHandlerChange);
    document.querySelector(`#images`).addEventListener(`change`, imagesHandlerChange);
  }


  window.validateForm = {
    validate
  };
})();

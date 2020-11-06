'use strict';
/*
* Проверка формы.
*/
(function () {
  const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;
  const save = window.backend.save;
  const sendIsSuccess = window.notices.sendIsSuccess;
  const sendIsError = window.notices.sendIsError;

  const adForm = window.variables.form.adForm;
  const adFormAvatar = window.variables.form.adFormAvatar;
  const adFormType = window.variables.form.adFormType;
  const adFormPrice = window.variables.form.adFormPrice;
  const adFormCapacity = window.variables.form.adFormCapacity;
  const adFormImages = window.variables.form.adFormImages;

  const adFormTitle = document.querySelector(`#title`);
  const adFormRoomNumber = window.variables.form.adFormRoomNumber;
  const DEPENCE_ROOM_GUESTS = window.constants.DEPENCE_ROOM_GUESTS;


  /*
  * Валидирует список. Если выполняется условие - сообщение об успехе, условие не выполняется - сообщение об ошибке.
  * @param {} condition
  * @param {} message
  * @param {} element
  */
  function makeCheckSelect(condition, message, element) {
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
  }


  /*
  * Проверка инпутов с двумя условиями. Условие один - нижний порог, условие два - верхний порог.
  * @param {} conditionOne
  * @param {} messageOne
  * @param {} conditionTwo
  * @param {} messageTwo
  * @param {} element - инпут, который проверяется.
  */
  function makeCheckInput(conditionOne, messageOne, conditionTwo, messageTwo, element) {
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
  }


  /* отлов изменения поля Количество комнат. */
  const roomNumberChangeHandler = function roomNumberChangeHandler(evt) {
    setCapacityValue(evt.target.value, evt.target, adFormCapacity);
  };


  /* отлов ввода текста в заголовок */
  const titleHandlerInput = function titleHandlerInput(evt) {
    makeCheckInput(evt.target.value.length < 30, `Заголовок объявления должен быть больше 30 символов`, evt.target.value.length > 100, `Заголовок объявления должен быть меньше 100 символов`, adFormTitle);
  };


  /* отлов изменение заголовка */
  const avatarHandlerChange = function avatarHandlerChange(evt) {
    window.form.showAvatarPreview(evt.target);
  };


  /* отлов загрузки изображений */
  const imagesHandlerChange = function imagesHandlerChange(evt) {
    window.form.showImagesPreview(evt.target);
  };


  /* отлов изменения поля Тип жилья */
  const typeChangeHandler = function typeChangeHandler(evt) {
    setPriceValue(evt.target.value, adFormPrice);
  };


  /* Устанавливает цену в плейсхолдер, проверяет введённую цену */
  function setPriceValue(value, element) {
    element.setAttribute(`min`, TYPE_MIN_PRICE[value]);
    element.placeholder = TYPE_MIN_PRICE[value];

    const priceHandlerBlur = function (evt) {
      evt.preventDefault();
      makeCheckInput((adFormType.value < TYPE_MIN_PRICE[value] || ``), (`Цена не менее ` + TYPE_MIN_PRICE[value]), (adFormType.value > 1000000), (`Цена не более 1 000 000`), adFormPrice);
    };

    adFormPrice.addEventListener(`blur`, priceHandlerBlur);
  }


  /* Устанавливает вместимость кол-во гостей */
  function setCapacityValue(selectedValue, selectedElement, setElement) {
    makeCheckSelect((DEPENCE_ROOM_GUESTS[selectedValue].includes(Number(setElement.value), 0)), `выберите допустимое количество гостей`, setElement);

    let selectedElementValue = selectedElement.querySelector(`option[value="` + [selectedValue] + `"]`);
    selectedElementValue.setAttribute(`selected`, `true`);

    for (let i = 0; i < setElement.length; i++) {
      setElement[i].setAttribute(`style`, `display: none`);
    }

    DEPENCE_ROOM_GUESTS[selectedValue].forEach(function (item) {
      setElement.querySelector(`option[value="` + item + `"]`).setAttribute(`style`, `display: auto`);
    });

    const capacityChangeHandler = function capacityChangeHandler(evt) {
      evt.target.querySelector(`option[value="` + [evt.target.value] + `"]`).setAttribute(`selected`, `true`);
      setCapacityValue(selectedValue, selectedElement, setElement);
    };

    adFormCapacity.addEventListener(`change`, capacityChangeHandler);
  }


  /*
  * Слушает форму
  */
  const submitHandler = function submitHandler(evt) {
    save(sendIsSuccess, sendIsError, new FormData(adForm));
    evt.preventDefault();
  };

  function validate() {
    adFormRoomNumber.addEventListener(`change`, roomNumberChangeHandler);
    adFormTitle.addEventListener(`input`, titleHandlerInput);
    adFormType.addEventListener(`change`, typeChangeHandler);
    adFormAvatar.addEventListener(`change`, avatarHandlerChange);
    adFormImages.addEventListener(`change`, imagesHandlerChange);
  }

  adForm.addEventListener(`submit`, submitHandler);


  window.validateForm = {
    validate,
  };
})();

'use strict';
/*
* Проверка формы.
*/
const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;
const save = window.backend.save;
const sendIsSuccess = window.notices.sendIsSuccess;
const sendIsError = window.notices.sendIsError;
const showAvatarPreview = window.form.showAvatarPreview;
const showImagesPreview = window.form.showImagesPreview;

const DEPENDS_ROOM_GUESTS = window.constants.DEPENDS_ROOM_GUESTS;

const adForm = window.variables.form.adForm;
const adFormAvatar = window.variables.form.adFormAvatar;
const adFormType = window.variables.form.adFormType;
const adFormPrice = window.variables.form.adFormPrice;
const adFormCapacity = window.variables.form.adFormCapacity;
const adFormImages = window.variables.form.adFormImages;
const adFormRoomNumber = window.variables.form.adFormRoomNumber;

const adFormTitle = document.querySelector(`#title`);


/*
* Валидирует список. Если выполняется условие - сообщение об успехе, условие не выполняется - сообщение об ошибке.
* @param {} condition
* @param {} message
* @param {} element
*/
const makeCheckSelect = (condition, message, element) => {
  let error = () => {
    element.setCustomValidity(message);
    element.reportValidity();
  };

  let success = () => {
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
const makeCheckInput = (conditionOne, messageOne, conditionTwo, messageTwo, element) => {
  let errorOne = () => {
    element.setCustomValidity(messageOne);
    element.reportValidity();
  };

  let errorTwo = () => {
    element.setCustomValidity(messageTwo);
    element.reportValidity();
  };

  let success = () => {
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
const roomNumberChangeHandler = (evt) => {
  setCapacityValue(evt.target.value, evt.target, adFormCapacity);
};


/* отлов ввода текста в заголовок */
const titleHandlerInput = (evt) => {
  makeCheckInput(evt.target.value.length < 30, `Заголовок объявления должен быть больше 30 символов`, evt.target.value.length > 100, `Заголовок объявления должен быть меньше 100 символов`, adFormTitle);
};


/* отлов изменение заголовка */
const avatarHandlerChange = (evt) => {
  showAvatarPreview(evt.target);
};


/* отлов загрузки изображений */
const imagesHandlerChange = (evt) => {
  showImagesPreview(evt.target);
};


/* отлов изменения поля Тип жилья */
const typeChangeHandler = (evt) => {
  setPriceValue(evt.target.value, adFormPrice);
};


/* Устанавливает цену в плейсхолдер, проверяет введённую цену */
const setPriceValue = (value, element) => {
  element.setAttribute(`min`, TYPE_MIN_PRICE[value]);
  element.placeholder = TYPE_MIN_PRICE[value];

  const priceHandlerBlur = (evt) => {
    evt.preventDefault();
    makeCheckInput((adFormPrice.value < TYPE_MIN_PRICE[value] || ``), (`Цена не менее ${TYPE_MIN_PRICE[value]}`), (adFormType.value > 1000000), (`Цена не более 1 000 000`), adFormPrice);
  };

  adFormPrice.addEventListener(`blur`, priceHandlerBlur);
};


/* Устанавливает вместимость кол-во гостей */
const setCapacityValue = (selectedValue, selectedElement, setElement) => {
  makeCheckSelect((DEPENDS_ROOM_GUESTS[selectedValue].includes(Number(setElement.value), 0)), `выберите допустимое количество гостей`, setElement);

  let selectedElementValue = selectedElement.querySelector(`option[value="${selectedValue}"`);
  selectedElementValue.setAttribute(`selected`, `true`);

  for (let i = 0; i < setElement.length; i++) {
    setElement[i].setAttribute(`style`, `display: none`);
  }

  DEPENDS_ROOM_GUESTS[selectedValue].forEach((item) => {
    setElement.querySelector(`option[value="${item}"]`).setAttribute(`style`, `display: auto`);
  });

  const capacityChangeHandler = (evt) => {
    evt.target.querySelector(`option[value="${evt.target.value}"]`).setAttribute(`selected`, `true`);
    setCapacityValue(selectedValue, selectedElement, setElement);
  };

  adFormCapacity.addEventListener(`change`, capacityChangeHandler);
};


/*
* Слушает форму
*/
const submitHandler = (evt) => {
  save(sendIsSuccess, sendIsError, new FormData(adForm));
  evt.preventDefault();
};

const validate = () => {
  adFormRoomNumber.addEventListener(`change`, roomNumberChangeHandler);
  adFormTitle.addEventListener(`input`, titleHandlerInput);
  adFormType.addEventListener(`change`, typeChangeHandler);
  adFormAvatar.addEventListener(`change`, avatarHandlerChange);
  adFormImages.addEventListener(`change`, imagesHandlerChange);
};

adForm.addEventListener(`submit`, submitHandler);


window.validateForm = {
  validate,
};

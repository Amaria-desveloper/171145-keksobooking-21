'use strict';

const NUMBER_OF_AVATARS = 8;

const TYPES = {
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`,
  bungalow: `Бунгало`
};

const CAPACITY = [
  `для 1 гостя`,
  `для 2 гостей`,
  `для 3 гостей`,
  `не для гостей`
];

const TIME_IN = [
  `12:00`,
  `13:00`,
  `14:00`
];

const TIME_OUT = TIME_IN;

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const DEPENCE_ROOM_GUESTS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const TYPE_MIN_PRICE = {
  palace: `10000`,
  flat: `1000`,
  house: `5000`,
  bungalow: `0`
};


/* случайности */
const getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrIndex = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


const getRandomArr = function (arr) {
  let randNum = getRandomInteger(0, arr.length - 1);
  let randomArr = arr.slice(randNum);
  return randomArr;
};


/* найти размер элемента
  задать сдвиг на основе размеров */
const sizeOfElement = {
  "getWidth": function (element) {
    return element.offsetWidth;
  },
  "getHeight": function (element) {
    return element.offsetHeight;
  }
};

const getOffset = function (element) {
  return {
    x: parseInt((sizeOfElement.getWidth(element) / 2), 10),
    y: parseInt((sizeOfElement.getHeight(element) / 2), 10)
  };
};


/* выбор случайного аватара */
const getAvatars = function () {
  const avatars = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    avatars[i] = `img/avatars/user0` + (1 + i) + `.png`;
  }
  return avatars;
};

const findElement = function (value) {
  return TYPES[value] || ``;
};


/* создание одного случайного объявления */
const getAdvert = function (map, element) {
  return {
    "author": {
      "avatar": getRandomArrIndex(getAvatars())
    },
    "offer": {
      "title": `Классное предложение`,
      "address": `0, 0`,
      "price": Math.round(getRandomInteger(1000, 5000) / 100) * 100,
      "type": getRandomArrIndex(Object.keys(TYPES)),
      "rooms": getRandomInteger(1, 3),
      "guests": getRandomArrIndex(CAPACITY),
      "checkin": getRandomArrIndex(TIME_IN),
      "checkout": getRandomArrIndex(TIME_OUT),
      "features": getRandomArr(FEATURES),
      "description": `Описание классного предложения`,
      "photos": getRandomArr(PHOTOS),
    },
    "location": {
      "x": getRandomInteger(0, (map - element)),
      "y": getRandomInteger(130, 630),
    }
  };
};


/* создание множества случайных объявлений */
const getAdverts = function () {
  let adverts = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    adverts.push(getAdvert(sizeOfElement.getWidth(document.querySelector(`.map`)), sizeOfElement.getWidth(document.querySelector(`.map__pin`))));
  }
  return adverts;
};

const adverts = getAdverts();
const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


const setupPin = function (template, data, index, offset) {
  let element = template.cloneNode(true);
  element.querySelector(`img`).src = data[index].author.avatar;
  element.querySelector(`img`).alt = data[index].offer.title;
  element.style.left = data[index].location.x + offset.x + `px`;
  element.style.top = data[index].location.y + offset.y + `px`;

  element.addEventListener(`mousedown`, function (evt) {
    pinChoiceHandlerMousedown(evt, data[index]);
  });

  element.addEventListener(`keydown`, function (evt) {
    pinChoiceHandlerEnter(evt, data[index]);
  });

  return element;
};

const setupCard = function (template, card) {
  let element = template.cloneNode(true);
  element.querySelector(`.popup__avatar`).src = card.author.avatar;
  element.querySelector(`.popup__title`).textContent = card.offer.title;
  element.querySelector(`.popup__text--address`).setAttribute(`style`, `visibility: hidden;`);
  element.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
  element.querySelector(`.popup__type`).textContent = findElement(card.offer.type);
  element.querySelector(`.popup__text--capacity`).textContent = `Комнат: ` + card.offer.rooms + `, ` + card.offer.guests;
  element .querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;

  for (let j = 0; j < FEATURES.length; j++) {
    if (card.offer.features.includes(FEATURES[j], 0) === false) {
      element.querySelector(`.popup__feature`).remove();
    }
  }

  element.querySelector(`.popup__description`).textContent = card.offer.description;
  element.querySelector(`.popup__photo`).src = card.offer.photos[0];
  if (card.offer.photos.length > 1) {
    for (let n = 1; n < card.offer.photos.length; n++) {
      let newPhoto = document.createElement(`img`);
      newPhoto.classList.add(`popup__photo`);
      newPhoto.src = card.offer.photos[n];
      newPhoto.width = `45`;
      newPhoto.height = `40`;
      newPhoto.alt = `Фотография жилья`;
      element.querySelector(`.popup__photos`).appendChild(newPhoto);
    }
  }

  element.querySelector(`.popup__close`).addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      closeCard(element);
    }
  });
  element.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeCard(element);
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      closeCard(element);
    }
  });

  return element;
};

/* module4 - task2*/
const renderAdverts = {
  "pins": function (template, data, offset) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(setupPin(template, data, i, offset));
    }
    return fragment;
  },

  "cards": function (template, card) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(setupCard(template, card));
    pinMap.append(fragment);
  }
};


const pinChoiceHandlerMousedown = function (evt, card) {
  const mapCard = document.querySelector(`.map__card`);
  if (evt.button === 0) {
    if (mapCard !== null) {
      mapCard.remove();
    }
    evt.preventDefault();
    renderAdverts.cards(cardTemplate, card);
  }
};

const pinChoiceHandlerEnter = function (evt, card) {
  const mapCard = document.querySelector(`.map__card`);
  if (evt.key === `Enter`) {
    if (mapCard !== null) {
      mapCard.remove();
    }
    evt.preventDefault();
    renderAdverts.cards(cardTemplate, card);
  }
};


const closeCard = function (element) {
  element.remove();
};


/* найти координаты метки */
const positionOfElement = {
  "getTop": function (element) {
    return parseInt(element.style.top, 10);
  },
  "getLeft": function (element) {
    return parseInt(element.style.left, 10);
  }
};

/* найти координаты метки куда указывает острый конец метки */
const getPositionOfElement = function (element) {
  let positionX =
      positionOfElement.getTop(element) + sizeOfElement.getHeight(element);
  let positionY =
    positionOfElement.getLeft(element) + (sizeOfElement.getWidth(element) / 2);

  return [positionX, ` ` + positionY];
};

/* установи адрес */
const setAddressValue = function (inputElement, newValueFrom) {
  let newValue = newValueFrom;
  inputElement.value = newValue;
};

/* установить начальные значения формы */
const installDefaultForm = function () {
  const capacity = document.querySelector(`#capacity`);
  for (let i = 1; i < capacity.length; i++) {
    capacity[i].setAttribute(`style`, `display: none`);
  }

  let address = document.querySelector(`#address`);
  let price = document.querySelector(`#price`);
  let avatar = document.querySelector(`#avatar`);
  let images = document.querySelector(`#images`);

  address.setAttribute(`style`, `color: brown`);
  address.setAttribute(`readonly`, `true`);

  const fieldType = document.querySelector(`#type`);

  price.placeholder = `1000`;
  price.setAttribute(`min`, TYPE_MIN_PRICE[fieldType.value]);
  price.setAttribute(`max`, `1000000`);

  document.querySelector(`#title`).addEventListener(`input`, titleHandlerInput);

  fieldType.addEventListener(`change`, typeChangeHandler);

  avatar.setAttribute(`accept`, `image/*`);
  avatar.addEventListener(`change`, avatarHandlerChange);

  images.setAttribute(`accept`, `image/*`);
  images.multiple = true;
  images.addEventListener(`change`, imagesHandlerChange);

  syncValues(document.querySelector(`#timein`), document.querySelector(`#timeout`));
};

const titleHandlerInput = function (evt) {
  makeCheckInput(evt.target.value.length < 30, `Заголовок объявления должен быть больше 30 символов`, evt.target.value.length > 100, `Заголовок объявления должен быть меньше 100 символов`, document.querySelector(`#title`));
};

const avatarHandlerChange = function (evt) {
  showAvatarPreview(evt.target);
};

const showAvatarPreview = function (fileUploadElement) {
  document.querySelector(`.ad-form-header__preview img`).src = URL.createObjectURL(fileUploadElement.files[0]);
};


const imagesHandlerChange = function (evt) {
  showImagesPreview(evt.target);
};

const showImagesPreview = function (fileUploadElement) {
  const adFormPhoto = document.querySelector(`.ad-form__photo`);
  let photo = document.createElement(`img`);
  photo.setAttribute(`width`, `100%`);
  photo.setAttribute(`height`, `100%`);
  photo.src = URL.createObjectURL(fileUploadElement.files[0]);
  adFormPhoto.appendChild(photo);

  if (fileUploadElement.files.length > 1) {
    let fragment = document.createDocumentFragment();
    for (let i = 1; i < fileUploadElement.files.length; i++) {
      let element = adFormPhoto.cloneNode(true);
      photo.setAttribute(`width`, `100%`);
      photo.setAttribute(`height`, `100%`);
      photo.src = URL.createObjectURL(fileUploadElement.files[i]);
      fragment.appendChild(element);
    }
    document.querySelector(`.ad-form__photo-container`).appendChild(fragment);
  }
};


/* синхронизация значений*/
const syncValues = function (firstElement, secondElement) {
  firstElement.addEventListener(`change`, function () {
    secondElement.value = firstElement.value;
  });

  secondElement.addEventListener(`change`, function () {
    firstElement.value = secondElement.value;
  });
};

/* проверка списка */
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


/* проверка длины вводимых значений */
const makeCheckInput = function (conditionOne, messageOne, conditionSecond, messageSecond, element) {

  let errorOne = function () {
    element.setCustomValidity(messageOne);
    element.reportValidity();
  };

  let errorTwo = function () {
    element.setCustomValidity(messageSecond);
    element.reportValidity();
  };

  let success = function () {
    element.setCustomValidity(``);
  };

  if (conditionOne) {
    errorOne();
  } else if (conditionSecond) {
    errorTwo();
  } else {
    success();
  }
};


/* тип жилья -> цена за ночь*/
const typeChangeHandler = function (evt) {
  setPriceValue(evt.target.value, document.querySelector(`#price`));
};

const setPriceValue = function (value, element) {
  element.setAttribute(`min`, TYPE_MIN_PRICE[value]);
  element.placeholder = TYPE_MIN_PRICE[value];
  const fieldPrice = document.querySelector(`#price`);

  const priceHandlerBlur = function (evt) {
    evt.preventDefault();
    makeCheckInput((fieldPrice.value > TYPE_MIN_PRICE[value] || ``), (`Цена не менее ` + TYPE_MIN_PRICE[value]), (document.querySelector(`#type`).value > 1000000), (`Цена не более 1 000 000`), fieldPrice);
  };

  fieldPrice.addEventListener(`blur`, priceHandlerBlur);
};


/* кол-во комнат <-> кол-во гостей */
const roomNumberChangeHandler = function (evt) {
  setCapacityValue(evt.target.value, evt.target, document.querySelector(`#capacity`));
};

const setCapacityValue = function (selectedValue, selectedElement, setElement) {
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


/* активация */
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

const setActive = function () {
  document.querySelector(`.map`).classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);

  makeDisabled.remove(document.querySelectorAll(`.ad-form fieldset`));
  makeDisabled.remove(document.querySelectorAll(`.map__filters fieldset`));
  makeDisabled.remove(document.querySelectorAll(`.map__filters select`));

  pinMap.append(renderAdverts.pins(pinTemplate, adverts, getOffset(document.querySelector(`.map__pin`))));

  installDefaultForm();

  document.querySelector(`#room_number`).addEventListener(`change`, roomNumberChangeHandler);
};


const setInactive = function () {
  document.querySelector(`.map`).classList.add(`map--faded`);
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
  makeDisabled.set(document.querySelectorAll(`.ad-form fieldset`));
  makeDisabled.set(document.querySelectorAll(`.map__filters fieldset`));
  makeDisabled.set(document.querySelectorAll(`.map__filters select`));
};

const mapPinMain = document.querySelector(`.map__pin--main`);

const mapPinMainHadlerMousedown = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    setActive();
    mapPinMain.removeEventListener(`mousedown`, mapPinMainHadlerMousedown);
  }
};

const mapPinMainHandlerEnter = function (evt) {
  if (evt.key === `Enter`) {
    setActive();
    mapPinMain.removeEventListener(`keydown`, mapPinMainHandlerEnter);
  }
};


const makeWork = function () {
  setAddressValue(document.querySelector(`#address`), getPositionOfElement(mapPinMain));

  mapPinMain.addEventListener(`mousedown`, mapPinMainHadlerMousedown);
  mapPinMain.addEventListener(`keydown`, mapPinMainHandlerEnter);
};


setInactive();
makeWork();

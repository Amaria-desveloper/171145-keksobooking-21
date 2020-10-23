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
const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


const setupPin = function (template, data, offset, element, index) {
  element.querySelector(`img`).src = data[index].author.avatar;
  element.querySelector(`img`).alt = data[index].offer.title;
  element.style.left = data[index].location.x + offset.x + `px`;
  element.style.top = data[index].location.y + offset.y + `px`;
  element.setAttribute(`data-advert-index`, index);
};


const setupCard = function (template, data, element, index) {
  element.querySelector(`.popup__avatar`).src = data[index].author.avatar;
  element.querySelector(`.popup__title`).textContent = data[index].offer.title;
  element.querySelector(`.popup__text--address`).setAttribute(`style`, `visibility: hidden;`);
  element.querySelector(`.popup__text--price`).textContent = data[index].offer.price + `₽/ночь`;
  element.querySelector(`.popup__type`).textContent = findElement(data[index].offer.type);
  element.querySelector(`.popup__text--capacity`).textContent = `Комнат: ` + data[index].offer.rooms + `, ` + data[index].offer.guests;
  element .querySelector(`.popup__text--time`).textContent = `Заезд после ` + data[index].offer.checkin + `, выезд до ` + data[index].offer.checkout;

  for (let j = 0; j < FEATURES.length; j++) {
    if (data[index].offer.features.includes(FEATURES[j], 0) === false) {
      element.querySelector(`.popup__feature`).remove();
    }
  }

  element.querySelector(`.popup__description`).textContent = data[index].offer.description;
  element.querySelector(`.popup__photo`).src = data[index].offer.photos[0];
  if (data[index].offer.photos.length > 1) {
    for (let n = 1; n < data[index].offer.photos.length; n++) {
      let newPhoto = document.createElement(`img`);
      newPhoto.classList.add(`popup__photo`);
      newPhoto.src = data[index].offer.photos[n];
      newPhoto.width = `45`;
      newPhoto.height = `40`;
      newPhoto.alt = `Фотография жилья`;
      element.querySelector(`.popup__photos`).appendChild(newPhoto);
    }
  }
  element.setAttribute(`data-advert-index`, index);
};

/* module4 - task2*/
const renderAdverts = {
  "pins": function (template, data, offset) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let element = template.cloneNode(true);
      setupPin(template, data, offset, element, i);
      fragment.appendChild(element);
    }

    return fragment;
  },

  "cards": function (template, data) {
    let pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (let i = 0; i < pins.length; i++) {
      pins[i].addEventListener(`mousedown`, function (evt) {
        pinChoiceHandlerMousedown(evt, i);
      });
    }

    const pinChoiceHandlerMousedown = function (evt, index) {
      if (evt.button === 0) {
        if (document.querySelector(`.map__card`) !== null) {
          document.querySelector(`.map__card`).remove();
        }
        evt.preventDefault();
        let pinChoosed = pins[index].getAttribute(`data-advert-index`);
        showCard(pinChoosed, template, data);
      }
    };
  }
};

const showCard = function (pinChoosed, template, data) {
  let card = pinChoosed;
  let fragment = document.createDocumentFragment();
  let element = template.cloneNode(true);

  setupCard(template, data, element, card);

  fragment.appendChild(element);
  pinMap.append(fragment);

  let currentCard = document.querySelector(`.map__card[data-advert-index="` + card + `"]`);

  currentCard.querySelector(`.popup__close`).addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      closeCard(currentCard);
    }
  });

  currentCard.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeCard(currentCard);
    }
  });
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
  for (let i = 1; i < document.querySelector(`#capacity`).length; i++) {
    document.querySelector(`#capacity`)[i].setAttribute(`style`, `display: none`);
  }

  let address = document.querySelector(`#address`);
  let price = document.querySelector(`#price`);
  let avatar = document.querySelector(`#avatar`);
  let images = document.querySelector(`#images`);

  address.setAttribute(`style`, `color: brown`);
  address.setAttribute(`tabindex`, `-1`);
  address.setAttribute(`readonly`, `true`);

  price.placeholder = `1000`;
  price.setAttribute(`min`, TYPE_MIN_PRICE[document.querySelector(`#type`).value]);
  price.setAttribute(`max`, `1000000`);

  document.querySelector(`#title`).addEventListener(`input`, titleHandlerInput);

  document.querySelector(`#type`).addEventListener(`change`, typeChangeHandler);

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
  let photo = document.createElement(`img`);
  photo.setAttribute(`width`, `100%`);
  photo.setAttribute(`height`, `100%`);
  photo.src = URL.createObjectURL(fileUploadElement.files[0]);
  document.querySelector(`.ad-form__photo`).appendChild(photo);

  if (fileUploadElement.files.length > 1) {
    let fragment = document.createDocumentFragment();
    for (let i = 1; i < fileUploadElement.files.length; i++) {
      let element = document.querySelector(`.ad-form__photo`).cloneNode(true);
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

  const priceHandlerBlur = function (evt) {
    evt.preventDefault();
    makeCheckInput((document.querySelector(`#price`).value > TYPE_MIN_PRICE[value] || ``), (`Цена не менее ` + TYPE_MIN_PRICE[value]), (document.querySelector(`#type`).value > 1000000), (`Цена не более 1 000 000`), document.querySelector(`#price`));
  };

  document.querySelector(`#price`).addEventListener(`blur`, priceHandlerBlur);
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
  renderAdverts.cards(cardTemplate, adverts);

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


const makeWork = function () {
  const mapPinMain = document.querySelector(`.map__pin--main`);
  setAddressValue(document.querySelector(`#address`), getPositionOfElement(document.querySelector(`.map__pin--main`)));

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      setActive();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      setActive();
    }
  });
};

setInactive();
makeWork();

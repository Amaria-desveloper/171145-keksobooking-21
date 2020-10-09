'use strict';

const NUMBER_OF_AVATARS = 8;

/*


const OFFSET_X = widthPin / 2;
const OFFSET_Y = heightPin / 2;
*/
const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const CAPACITY = [
  `для 3 гостей`,
  `для 2 гостей`,
  `для 1 гостя`,
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
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];


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


const getAvatars = function () {
  const avatars = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    avatars[i] = `img/avatars/user0` + (1 + i) + `.png`;
  }
  return avatars;
};


const getSizeOfElement = function () {
  return {
    Pin: {
      Width: document.querySelector(`.map__pin`).offsetWidth,
      Height: document.querySelector(`.map__pin`).offsetHeight
    },
    WidthMap: document.querySelector(`.map`).offsetWidth,
  };
};
let sizeOfElement = getSizeOfElement();


const getAdvert = function () {
  return {
    "author": {
      "avatar": getRandomArrIndex(getAvatars())
    },
    "offer": {
      "title": `Классное предложение`,
      "address": `0, 0`,
      "price": Math.round(getRandomInteger(1000, 5000) / 100) * 100,
      "type": getRandomArrIndex(TYPES),
      "rooms": getRandomInteger(1, 5),
      "guests": getRandomArrIndex(CAPACITY),
      "checkin": getRandomArrIndex(TIME_IN),
      "checkout": getRandomArrIndex(TIME_OUT),
      "features": getRandomArr(FEATURES),
      "description": `Описание классного предложения`,
      "photos": getRandomArr(PHOTOS),
    },
    "location": {
      "x": getRandomInteger(0, (sizeOfElement.WidthMap - sizeOfElement.Pin.Width)),
      "y": getRandomInteger(130, 630),
    }
  };
};

const getAdverts = function () {
  let adverts = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    adverts.push(getAdvert(i));
  }
  return adverts;
};


const createElementsFromTemplate = function (template, data) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    let element = template.cloneNode(true);
    element.querySelector(`img`).src = data[i].author.avatar;
    element.querySelector(`img`).alt = data[i].offer.title;
    element.style.left = data[i].location.x + (sizeOfElement.Pin.Width / 2) + `px`;
    element.style.top = data[i].location.y + (sizeOfElement.Pin.Height / 2) + `px`;
    fragment.appendChild(element);
  }
  return fragment;
};

const createCardFromTemplate = function (template, data) {
  let fragment = document.createDocumentFragment();
  let element = template.cloneNode(true);

  element.querySelector(`.popup__avatar`).src = data[0].author.avatar;
  element.querySelector(`.popup__title`).textContent = data[0].offer.title;
  element.querySelector(`.popup__text--address`).setAttribute(`style`, `visibility: hidden;`);
  element.querySelector(`.popup__text--price`).textContent = data[0].offer.price + `₽/ночь`;

  if (data[0].offer.type === `flat`) {
    element.querySelector(`.popup__type`).textContent = `Квартира`;
  }
  if (data[0].offer.type === `bungalow`) {
    element.querySelector(`.popup__type`).textContent = `Бунгало`;
  }
  if (data[0].offer.type === `house`) {
    element.querySelector(`.popup__type`).textContent = `Дом`;
  }
  if (data[0].offer.type === `palace`) {
    element.querySelector(`.popup__type`).textContent = `Дворец`;
  }

  element.querySelector(`.popup__text--capacity`).textContent = `Комнат: ` + data[0].offer.rooms + `, ` + data[0].offer.guests;
  element .querySelector(`.popup__text--time`).textContent = `Заезд после ` + data[0].offer.checkin + `, выезд до ` + data[0].offer.checkout;

  if (data[0].offer.features.includes(`wifi`, 0) === false) {
    element.querySelector(`.popup__feature--wifi`).remove();
  }
  if (data[0].offer.features.includes(`dishwasher`, 0) === false) {
    element.querySelector(`.popup__feature--dishwasher`).remove();
  }
  if (data[0].offer.features.includes(`parking`, 0) === false) {
    element.querySelector(`.popup__feature--parking`).remove();
  }
  if (data[0].offer.features.includes(`washer`, 0) === false) {
    element.querySelector(`.popup__feature--washer`).remove();
  }
  if (data[0].offer.features.includes(`elevator`, 0) === false) {
    element.querySelector(`.popup__feature--elevator`).remove();
  }
  if (data[0].offer.features.includes(`conditioner`, 0) === false) {
    element.querySelector(`.popup__feature--conditioner`).remove();
  }

  element.querySelector(`.popup__description`).textContent = data[0].offer.description;

  element.querySelector(`.popup__photo`).src = data[0].offer.photos[0];
  if (data[0].offer.photos.length > 1) {
    for (let i = 1; i < data[0].offer.photos.length; i++) {
      let newPhoto = document.createElement(`img`);
      newPhoto.classList.add(`popup__photo`);
      newPhoto.src = data[0].offer.photos[i];
      newPhoto.width = `45`;
      newPhoto.height = `40`;
      newPhoto.alt = `Фотография жилья`;
      element.querySelector(`.popup__photos`).appendChild(newPhoto);
    }
  }
  fragment.appendChild(element);
  return fragment;
};


const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

pinMap.appendChild(createElementsFromTemplate(pinTemplate, getAdverts()));
pinMap.appendChild(createCardFromTemplate(cardTemplate, getAdverts()));

document.querySelector(`.map`).classList.remove(`map--faded`);

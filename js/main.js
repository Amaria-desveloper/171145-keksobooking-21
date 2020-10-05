'use strict';

const NUMBER_OF_AVATARS = 8;
const numberOfSimilarAdvert = NUMBER_OF_AVATARS;

const widthMap = document.querySelector(`.map`)
    .offsetWidth;
const widthPin = document.querySelector(`.map__pin`)
    .offsetWidth;
const heightPin = document.querySelector(`.map__pin`)
    .offsetHeight;

const OFFSET_X = widthPin / 2;
const OFFSET_Y = heightPin / 2;

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

const TIMEIN = [
  `12:00`,
  `13:00`,
  `14:00`
];

const TIMEOUT = TIMEIN;

const FEATURES = `wifi, dishwasher, parking, washer, elevator, conditioner`;

const PHOTOS = `http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg`;


const getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomArrIndex = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomArrFromStr = function (stringData) {
  let arrFromString = stringData.split(`,`);
  let randNum = getRandomInteger(0, arrFromString.length - 1);
  let randomArrFromStr = arrFromString.slice(randNum);
  return randomArrFromStr;
};


const getAvatars = function () {
  const avatars = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    avatars[i] = `img/avatars/user0` + (1 + i) + `.png`;
  }
  return avatars;
};


const getAdvert = function () {
  return {
    "author": {
      "avatar": getRandomArrIndex(getAvatars())
    },
    "offer": {
      "title": `Заголовок`,
      "address": `location.x, location.y`,
      "price": Math.round(getRandomInteger(1000, 5000) / 100) * 100,
      "type": getRandomArrIndex(TYPES),
      "rooms": getRandomInteger(1, 5),
      "guests": getRandomArrIndex(CAPACITY),
      "checkin": getRandomArrIndex(TIMEIN),
      "checkout": getRandomArrIndex(TIMEOUT),
      "features": getRandomArrFromStr(FEATURES),
      "description": `описание описание`,
      "photos": getRandomArrFromStr(PHOTOS),
    },
    "location": {
      "x": getRandomInteger(0, widthMap - (OFFSET_X * 2)),
      "y": getRandomInteger(130, 630),
    }
  };
};


const getAdverts = function () {
  let adverts = [];
  for (let i = 0; i < numberOfSimilarAdvert; i++) {
    adverts.push(getAdvert(i));
  }
  return adverts;
};

const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

const createElementsFromTemplate = function (parent, template, data) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    let element = template.cloneNode(true);
    element.querySelector(`img`).src = data[i].author.avatar;
    element.querySelector(`img`).alt = data[i].offer.title;
    element.style.left = data[i].location.x + OFFSET_X + `px`;
    element.style.top = data[i].location.y + OFFSET_Y + `px`;
    fragment.appendChild(element);
  }
  parent.appendChild(fragment);
};


const renderElements = function () {
  createElementsFromTemplate(pinMap, pinTemplate, getAdverts());
};

renderElements();

document.querySelector(`.map`).classList.remove(`map--faded`);

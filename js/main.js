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
      "title": `Заголовок`,
      "address": `location.x, location.y`,
      "price": Math.round(getRandomInteger(1000, 5000) / 100) * 100,
      "type": getRandomArrIndex(TYPES),
      "rooms": getRandomInteger(1, 5),
      "guests": getRandomArrIndex(CAPACITY),
      "checkin": getRandomArrIndex(TIME_IN),
      "checkout": getRandomArrIndex(TIME_OUT),
      "features": getRandomArr(FEATURES),
      "description": `описание описание`,
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
  pinMap.appendChild(fragment);
};

const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

createElementsFromTemplate(pinTemplate, getAdverts());

document.querySelector(`.map`).classList.remove(`map--faded`);

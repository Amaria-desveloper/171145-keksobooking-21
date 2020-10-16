'use strict';

const NUMBER_OF_AVATARS = 8;

const TYPES = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

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

const sizeOfElement = {
    getWidth: function (element) {
      return element.offsetWidth
    },
    getHeight: function (element) {
      return element.offsetHeight
    }
};


const getAvatars = function () {
  const avatars = [];
  for (let i = 0; i < NUMBER_OF_AVATARS; i++) {
    avatars[i] = `img/avatars/user0` + (1 + i) + `.png`;
  }
  return avatars;
};


const findElement = function (value) {
  switch (value) {
    case `palace`: return `Дворец`;
    case `flat`: return `Квартира`;
    case `house`: return `Дом`;
    case `bungalow`: return `Бунгало`;
    default: return ``;
  }
};


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
      "rooms": getRandomInteger(1, 3),
      "guests": getRandomArrIndex(CAPACITY),
      "checkin": getRandomArrIndex(TIME_IN),
      "checkout": getRandomArrIndex(TIME_OUT),
      "features": getRandomArr(FEATURES),
      "description": `Описание классного предложения`,
      "photos": getRandomArr(PHOTOS),
    },
    "location": {
      "x": getRandomInteger(0, (sizeOfElement.getWidth(document.querySelector(`.map`)) - sizeOfElement.getWidth(document.querySelector(`.map__pin`)))),
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


const createPinsFromTemplate = function (template, data) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    let element = template.cloneNode(true);
    element.querySelector(`img`).src = data[i].author.avatar;
    element.querySelector(`img`).alt = data[i].offer.title;
    element.style.left = data[i].location.x + sizeOfElement.getWidth(document.querySelector(`.map__pin`)) / 2 + `px`;
    element.style.top = data[i].location.y + sizeOfElement.getHeight(document.querySelector(`.map__pin`)) / 2 + `px`;
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
  element.querySelector(`.popup__type`).textContent = findElement(data[0].offer.type);
  element.querySelector(`.popup__text--capacity`).textContent = `Комнат: ` + data[0].offer.rooms + `, ` + data[0].offer.guests;
  element .querySelector(`.popup__text--time`).textContent = `Заезд после ` + data[0].offer.checkin + `, выезд до ` + data[0].offer.checkout;

  for (let i = 0; i < FEATURES.length; i++) {
    if (data[0].offer.features.includes(FEATURES[i], 0) === false) {
      element.querySelector(`.popup__feature`).remove();
    }
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

const adverts = getAdverts();
const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

/* До следующего задания pinMap.append(createCardFromTemplate(cardTemplate, adverts)); */


/* module4 - task1
1. disabled
2. активация страницы
3. заполнения поля адреса
4. валидация: гости = кол-во комнат*/

const positionOfElement = {
    getTop: function (element) {
      return parseInt(element.style.top);
    },
    getLeft: function (element) {
      return parseInt(element.style.left);
    }
};


const getPositionOfElement = function (element) {
    let positionX =
        positionOfElement.getTop(element) + sizeOfElement.getHeight(element);
    let positionY =
      positionOfElement.getLeft(element) + (sizeOfElement.getWidth(element) / 2);

    return [positionX, ` ` + positionY];
};


const setAddressValue = function (inputElement, newValueFrom) {
  let newValue = newValueFrom;
  inputElement.value = newValue;
};




  const setCapacityValue = function (selectedIndex, setElementValue) {
    for (let i = 0; i < setElementValue.length; i++) {
        setElementValue[i].setAttribute(`style`, `display: none`);
      }

      switch(selectedIndex) {
        case 0:  setElementValue[0].setAttribute(`style`, `display: auto`);
        break;

        case 1: for (let i = 0; i < 2; i++) {
          setElementValue[i].setAttribute(`style`, `display: auto`);
        }
        break;

        case 2: for (let i = 0; i < 3; i++) {
          setElementValue[i].setAttribute(`style`, `display: auto`);
        }
        break;

        case 3: setElementValue[3].setAttribute(`style`, `display: auto`);
        break;
      }
  };


const roomNumberChangeHandler = function (evt) {
  let selectedIndex = evt.target.selectedIndex;
  console.log(selectedIndex);
  setCapacityValue(selectedIndex, document.querySelector(`#capacity`));
};
document.querySelector(`#room_number`).addEventListener('change', roomNumberChangeHandler);




const makeDisabled = {
    Set: function (element) {
      for (let i = 0; i < element.length; i++) {
        element[i].setAttribute(`disabled`, true);
      }
     },
    Remove: function (element) {
      for (let i = 0; i < element.length; i++) {
        element[i].removeAttribute(`disabled`, true);
      }
    }
  };

const setActive = function () {
  document.querySelector(`.map`).classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  pinMap.append(createPinsFromTemplate(pinTemplate, adverts));
  makeDisabled.Remove(document.querySelectorAll(`.ad-form fieldset`));
};


const setInactive = function () {
  document.querySelector(`.map`).classList.add(`map--faded`);
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);
  makeDisabled.Set(document.querySelectorAll(`.ad-form fieldset`));
  makeDisabled.Set(document.querySelectorAll(`.map__filters fieldset`));
  makeDisabled.Set(document.querySelectorAll(`.map__filters select`));
};


const makeWork = function () {
  const mapPinMain = document.querySelector(`.map__pin--main`);

  mapPinMain.addEventListener(`mousedown`, function(evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      setActive();
      setAddressValue(document.querySelector(`#address`), getPositionOfElement(document.querySelector(`.map__pin--main`)));
    }
  });

  mapPinMain.addEventListener(`keydown`, function(evt) {
    if (evt.key === `Enter`) {
      setActive();
      setAddressValue(document.querySelector(`#address`), getPositionOfElement(document.querySelector(`.map__pin--main`)));
    }
  });


}

setInactive();
makeWork();



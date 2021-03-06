'use strict';
/*
* Манипуляции с DOM-элементом <map__card>.
*/
const findElement = window.util.findElement;
const closeElement = window.util.closeElement;

const TYPES = window.constants.TYPES;
const FEATURES = window.constants.FEATURES;

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


/**
* Генерирует DOM-элемент для Карточки объявления.
* @external Node
* @param {Object} card - Конкретная карточка. Данные для шаблона. (От клика по Пину).
* @param {external:Node} pin - связанный Пин.
* @return {external:Node} element - разметка одной Карточки объявления с информацией и стилями.
*/
const setupCard = (card, pin) => {
  let element = cardTemplate.cloneNode(true);
  element.querySelector(`.popup__avatar`).src = card.author.avatar;
  element.querySelector(`.popup__title`).textContent = card.offer.title;
  element.querySelector(`.popup__text--address`).textContent = card.offer.address;
  element.querySelector(`.popup__text--price`).textContent = `${card.offer.price} ₽/ночь`;
  element.querySelector(`.popup__type`).textContent = findElement(TYPES, card.offer.type);
  element.querySelector(`.popup__text--capacity`).textContent = `Комнат: ${card.offer.rooms}, кол-во спальных мест: ${card.offer.guests}`;
  element .querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  FEATURES.filter((feature) => {
    if (!card.offer.features.includes(feature)) {
      element.querySelector(`.popup__feature--${feature}`).remove();
    }
  });

  element.querySelector(`.popup__description`).textContent = card.offer.description;

  /*
  * если с сервера undefined, то массив photo пустой. Если фото нет - спрятать блок, есть - вывести по шаблону.
  */
  if (card.offer.photos.length === 0) {
    element.querySelector(`.popup__photo`).setAttribute(`style`, `visibility: hidden;`);
  } else {
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
  }

  const popupButtonCloseClickHandler = () => {
    closeElement(element);
    pin.classList.remove(`map__pin--active`);
  };

  const popupButtonEscHandler = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeElement(element);
    }
    document.removeEventListener(`keydown`, popupButtonEscHandler);
  };

  element.querySelector(`.popup__close`).addEventListener(`click`, popupButtonCloseClickHandler);
  document.addEventListener(`keydown`, popupButtonEscHandler);

  return element;
};

const removeCard = () => {
  const mapCard = document.querySelector(`.map__card`);
  if (mapCard) {
    closeElement(mapCard);
  }
};

window.card = {
  setupCard,
  removeCard,
};

'use strict';
/*
* Манипуляции с DOM-элементом <map__pin>.
*/
(function () {
  const close = window.util.close;
  const makeFilter = window.filter.makeFilter;
  const setupCard = window.card.setupCard;
  const removeCard = window.card.removeCard;

  const QUANTITY_PINS = window.constants.QUANTITY_PINS;

  const mapPins = window.variables.map.mapPins;
  const mapFilter = window.variables.map.mapFilter;
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  /**
  * Генерирует DOM-элемент для Пина. Слушает клик по выбранному Пину.
  * @external Node
  * @param {Array.<Object>} data - массив из объекта. Данные для шаблона.
  * @param {Number} index - номер элемента массива data.
  * @return {external:Node} element - разметка одного Пина с информацией и стилями.
  */
  const setupPin = (data, index) => {
    let element = pinTemplate.cloneNode(true);
    element.querySelector(`img`).src = data[index].author.avatar;
    element.querySelector(`img`).alt = data[index].offer.title;
    element.style.left = data[index].location.x + `px`;
    element.style.top = data[index].location.y + `px`;

    element.addEventListener(`click`, function () {
      pinChoiceClickHandler(data[index], element);
    });

    return element;
  };


  /*
  * Ловит выбор Пина на карте.
  * @param {} element - переданный текущий Пин.
  * @param {Object} card - Объект с данными для карточки объявления.
  */
  const pinChoiceClickHandler = function pinChoiceClickHandler(card, element) {
    let mapCard = document.querySelector(`.map__card`);
    if (mapCard !== null) {
      close(mapCard);
    }

    if (mapPins.querySelector(`.map__pin--active`)) {
      mapPins.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
    }
    element.classList.add(`map__pin--active`);

    mapPins.append(setupCard(card, element));
  };


  /*
  * Генерирует множество Пинов.
  * @external Node
  * @param {external:Node} template - шаблон Пина.
  * @param {Array.<Object>} data - массив объектов с данными для карточки объявления.
  * @param {function} offset - размеры для учёта смещения метки.
  * @return (HTMLElement) fragment - возвращает #document-fragment. Созданное множество Пинов.
  */
  const renderPins = (data, showQuantity) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < showQuantity; i++) {
      fragment.appendChild(setupPin(data, i));
    }
    return fragment;
  };

  /*
  * Генерирует множество Пинов со свойством Offer
  */
  const generateAvailablePins = (pins) => {
    let newPins = [];
    for (let i = 0; i < pins.length; i++) {
      if (pins[i].offer !== undefined) {
        newPins.push(pins[i]);
      }
    }
    return newPins;
  };


  /*
* Удаляет все отрисованные Пины
*/
  const removeCurrentPins = () => {
    let currentPins = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of currentPins) {
      close(pin);
    }
  };


  /*
  * Добавляет Пины на карту
  */
  const addPinOnMap = (data) => {

    let advertsAll = data;
    let adverts = generateAvailablePins(advertsAll);

    let initialAdverts = adverts.reverse();
    mapPins.append(renderPins(initialAdverts, QUANTITY_PINS));

    const filterTypeChangeHandler = function filterTypeChangeHandler() {
      removeCurrentPins();
      removeCard();

      let filteredAdverts = makeFilter(adverts);
      let filteredAdvertsLength = filteredAdverts.length;

      if (filteredAdvertsLength < QUANTITY_PINS) {
        mapPins.append(renderPins(filteredAdverts, filteredAdvertsLength));
      } else {
        mapPins.append(renderPins(filteredAdverts, QUANTITY_PINS));
      }
    };

    mapFilter.addEventListener(`change`, filterTypeChangeHandler);
  };

  window.pin = {
    renderPins,
    removeCurrentPins,
    generateAvailablePins,
    addPinOnMap,
  };
})();

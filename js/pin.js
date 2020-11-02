'use strict';
/*
* Манипуляции с DOM-элементом <map__pin>.
*/
(function () {
  const setupCard = window.card.setupCard;
  const mapPins = window.variables.map.mapPins;
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


  /**
  * Генерирует DOM-элемент для Пина. Слушает клик по выбранному Пину.
  * @external Node
  * @param {external:Node} template - шаблон Пина.
  * @param {Array.<Object>} data - массив из объекта. Данные для шаблона.
  * @param {Number} index - номер элемента массива data.
  * @return {external:Node} element - разметка одного Пина с информацией и стилями.
  */
  function setupPin(template, data, index) {
    let element = template.cloneNode(true);
    element.querySelector(`img`).src = data[index].author.avatar;
    element.querySelector(`img`).alt = data[index].offer.title;
    element.style.left = data[index].location.x + `px`;
    element.style.top = data[index].location.y + `px`;

    element.addEventListener(`click`, function (evt) {
      pinChoiceClickHandler(evt, data[index]);
    });

    return element;
  }


  /*
  * Ловит выбор Пина на карте.
  * @param {MyEvent} evt - нажатие клавиши или кнопки мыши.
  * @param {Object} card - Объект с данными для карточки объявления.
  */
  const pinChoiceClickHandler = function (evt, card) {
    let mapCard = document.querySelector(`.map__card`);
    if (mapCard !== null) {
      mapCard.remove();
    }
    mapPins.append(setupCard(cardTemplate, card));
  };


  /*
  * Генерирует множество Пинов.
  * @external Node
  * @param {external:Node} template - шаблон Пина.
  * @param {Array.<Object>} data - массив объектов с данными для карточки объявления.
  * @param {function} offset - размеры для учёта смещения метки.
  * @return (HTMLElement) fragment - возвращает #document-fragment. Созданное множество Пинов.
  */
  function renderPins(template, data) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(setupPin(template, data, i));
    }
    return fragment;
  }

  window.pin = {
    renderPins
  };

})();

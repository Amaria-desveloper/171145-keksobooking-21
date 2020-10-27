'use strict';

(function () {

  /**
  * Генерирует DOM-элемент для Пина.
  * @external Node
  * @param {external:Node} template - шаблон Пина.
  * @param {Array.<Object>} data - массив из объекта. Данные для шаблона.
  * @param {Number} index - номер элемента массива data.
  * @param {Object.<Number>} offset - смещение по x,y.
  * @return {external:Node} element - разметка одного Пина с информацией и стилями.
  */
  function setupPin(template, data, index, offset) {
    let element = template.cloneNode(true);
    element.querySelector(`img`).src = data[index].author.avatar;
    element.querySelector(`img`).alt = data[index].offer.title;
    element.style.left = data[index].location.x + offset.x + `px`;
    element.style.top = data[index].location.y + offset.y + `px`;


    /*
    * слушает нажатие мыши по Пину
    */
    element.addEventListener(`mousedown`, function (evt) {
      pinChoiceHandler(evt, data[index]);
    });

    /*
    * слушает нажатие Enter по Пину
    */
    element.addEventListener(`keydown`, function (evt) {
      pinChoiceHandler(evt, data[index]);
    });

    return element;
  }


  /*
  * Ловит выбор Пина на карте.
  * @param {MyEvent} evt - нажатие клавиши или кнопки мыши.
  * @param {Object} card - Объект с данными для карточки объявления.
  */
  const pinChoiceHandler = function (evt, card) {
    const renderCards = window.card.renderCards;
    const pinMap = document.querySelector(`.map__pins`);
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const mapCard = document.querySelector(`.map__card`);

    if (evt.button === 0) {
      if (mapCard !== null) {
        mapCard.remove();
      }
      evt.preventDefault();
      pinMap.append(renderCards(cardTemplate, card));
    }

    if (evt.key === `Enter`) {
      if (mapCard !== null) {
        mapCard.remove();
      }
      evt.preventDefault();
      pinMap.append(renderCards(cardTemplate, card));
    }
  };


  /*
  * Генерирует множество Пинов.
  * @external Node
  * @param {external:Node} template - шаблон Пина.
  * @param {Array.<Object>} data - массив объектов с данными для карточки объявления.
  * @param {function} offset - размеры для учёта смещения метки.
  * @return (HTMLElement) fragment - возвращает #document-fragment. Созданное множество Пинов.
  */
  function renderPins(template, data, offset) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(setupPin(template, data, i, offset));
    }
    return fragment;
  }

  window.pin = {
    renderPins
  };

})();

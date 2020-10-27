'use strict';

(function () {
  /*
  * Найти размер элемента.
  * @external Node
  * @param {external:Node} element - DOM-элемент.
  * @return
  */
  const sizeOfElement = {
    "getWidth": function (element) {
      return element.offsetWidth;
    },
    "getHeight": function (element) {
      return element.offsetHeight;
    }
  };


  /*
  * Задать сдвиг на основе размеров элемента.
  * @external Node
  * @param {external:Node} element - DOM-элемент.
  * @return {Object} getOffset - смещение по x,y.
  * @return {number}  getOffset.x - x-координата
  * @return {number}  getOffset.y - y-координата
  */
  function getOffset(element) {
    return {
      x: parseInt((sizeOfElement.getWidth(element) / 2), 10),
      y: parseInt((sizeOfElement.getHeight(element) / 2), 10)
    };
  }


  /*
  * Найти ключ объекта TYPES
  * @param {string} value - строка, которую нужно найти в ключах объекта.
  * @return {string} TYPES[value] - в случае успеха возвращает свойство найденного ключа.
  * @return {string} `` - в случае неудачи возвращает пустую строку.
  */
  function findElement(value) {
    const TYPES = window.constants.TYPES;
    return TYPES[value] || ``;
  }


  /*
  * Найти координаты метки
  *
  */
  const positionOfElement = {
    "getTop": function (element) {
      return parseInt(element.style.top, 10);
    },
    "getLeft": function (element) {
      return parseInt(element.style.left, 10);
    }
  };


  /*
  * найти координаты метки куда указывает острый конец метки
  */
  function getPositionOfElement(element) {
    let positionX =
        positionOfElement.getTop(element) + sizeOfElement.getHeight(element);
    let positionY =
      positionOfElement.getLeft(element) + (sizeOfElement.getWidth(element) / 2);

    return [positionX, ` ` + positionY];
  }


  window.util = {
    sizeOfElement,
    getOffset,
    findElement,
    getPositionOfElement,
  };

})();

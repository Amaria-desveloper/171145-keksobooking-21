'use strict';
/*
* Найти размер элемента.
* @external Node
* @param {external:Node} element - DOM-элемент.
* @return
*/
const sizeOfElement = {
  "getWidth": (element) => element.offsetWidth,
  "getHeight": (element) => element.offsetHeight,
};


/*
* Задать сдвиг на основе размеров элемента.
* @external Node
* @param {external:Node} element - DOM-элемент.
* @return {Object} getOffset - смещение по x,y.
* @return {number}  getOffset.x - x-координата
* @return {number}  getOffset.y - y-координата
*/
const getOffset = (element) => ({x: parseInt((sizeOfElement.getWidth(element) / 2), 10), y: parseInt((sizeOfElement.getHeight(element) / 2), 10)});


/*
* Найти ключ объекта TYPES
* @param {string} value - строка, которую нужно найти в ключах объекта.
* @return {string} TYPES[value] - в случае успеха возвращает свойство найденного ключа.
* @return {string} `` - в случае неудачи возвращает пустую строку.
*/
const findElement = (object, value) => object[value] || ``;

/*
* Найти координаты метки
*
*/
const positionOfElement = {
  "getTop": (element) => parseInt(element.style.top, 10),
  "getLeft": (element) => parseInt(element.style.left, 10),
};


/*
* Координаты главной метки (по указателю)
*/
const getCoordinateOfPinMain = () => {
  let element = document.querySelector(`.map__pin--main`);
  const pinPointer = window.getComputedStyle(element, `::after`);
  const pinPointerWidth = parseInt(pinPointer.getPropertyValue(`border-top-width`), 10);

  let positionX = Math.floor(positionOfElement.getLeft(element) + (sizeOfElement.getWidth(element) / 2));
  let positionY = Math.floor(positionOfElement.getTop(element) + sizeOfElement.getHeight(element) + (pinPointerWidth / 2));

  return [positionX + `, ` + positionY];
};

/*
* Координаты главной метки по её центру (в неактивном состоянии)
*/
const getCoordinateCenterOfPinMain = (element) => {
  let positionX = Math.floor(positionOfElement.getLeft(element) + (sizeOfElement.getWidth(element) / 2));
  let positionY = Math.floor(positionOfElement.getTop(element) + (sizeOfElement.getHeight(element) / 2));

  return [positionX + `, ` + positionY];
};


/*
* Закрывает карточку. Удаляет узел из DOM.
*
*/
const closeElement = (element) => element.remove();

/*
* Переключатель атрибута disabled
*/
const makeDisabled = {
  "set": (element) => {
    for (let i = 0; i < element.length; i++) {
      element[i].setAttribute(`disabled`, true);
    }
  },
  "remove": (element) => {
    for (let i = 0; i < element.length; i++) {
      element[i].removeAttribute(`disabled`, true);
    }
  },
};

/*
* Разметка модального окна с ошибкой (при ошибки загрузки данных с сервера)
*/
const modalLayout = (errorMessage) => {
  const node = document.createElement(`div`);
  node.id = `modal`;
  node.style = `z-index: 100; display: flex; justify-content: center; min-height: 50px; margin: auto; padding: 15px; background-color: white; border: 2px solid SkyBlue; border-radius: 10px`;
  node.style.position = `fixed`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `26px`;

  const p = document.createElement(`p`);
  p.style = `display: inherit`;
  p.textContent = errorMessage;

  const button = document.createElement(`button`);
  button.id = `modalButton`;
  button.style = `display: block; width: 40px; height: 20px; border-radius: 4px; border-color: SkyBlue; background-color: seashell; outline-color: SkyBlue`;
  button.style.position = `absolute`;
  button.style.bottom = `2px`;
  button.style.fontSize = `12px`;
  button.textContent = `OK`;

  node.appendChild(p);
  node.appendChild(button);

  return node;
};


const debounce = (cb) => {
  const TIMEOUT = 500;
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, TIMEOUT);
  };
};

window.util = {
  sizeOfElement,
  getOffset,
  findElement,
  getCoordinateOfPinMain,
  getCoordinateCenterOfPinMain,
  closeElement,
  makeDisabled,
  modalLayout,
  debounce,
};

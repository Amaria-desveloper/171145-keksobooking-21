'use strict';
/*
* Точка входа
*/
const removeCurrentPins = window.pin.removeCurrentPins;
const setInactive = window.map.setInactive;
const makeWork = window.map.makeWork;

/*
* при запуске
*/
const setInitial = () => {
  setInactive();
  makeWork();
};

/*
* Возвращает страницу в начальное состояние
*/
const restartPage = () => {
  removeCurrentPins();
  setInitial();
};


setInitial();


window.main = {
  restartPage,
};

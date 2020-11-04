'use strict';
/*
* Точка входа
*/
(function () {
  const removeCurrentPins = window.pin.removeCurrentPins;
  const setInactive = window.map.setInactive;
  const makeWork = window.map.makeWork;

  /*
  * при запуске
  */
  function setInitial() {
    setInactive();
    makeWork();
  }

  /*
  * Возвращает страницу в начальное состояние
  */
  function restartPage() {
    removeCurrentPins();
    setInitial();
  }


  setInitial();


  window.main = {
    restartPage
  };


})();

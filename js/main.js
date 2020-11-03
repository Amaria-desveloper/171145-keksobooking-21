'use strict';
/*
* Точка входа
*/
(function () {
  const setInactive = window.map.setInactive;
  const makeWork = window.map.makeWork;
  const removeCurrentPins = window.pin.removeCurrentPins;

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

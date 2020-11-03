'use strict';
/*
* Сохраняет инициализирующие значений позиции Метки.
*/
(function () {
  const mapPinMain = window.variables.map.mapPinMain;

  const backMapPinMain = {
    "left": mapPinMain.style.left,
    "top": mapPinMain.style.top
  };

  window.backMapPinMain = backMapPinMain;
})();

'use strict';
/*
* Логика перемещения главной метки.
*/
(function () {
  const mapPinMain = window.variables.map.mapPinMain;
  const map = window.variables.map.map;
  const getWidth = window.util.sizeOfElement.getWidth;
  const getOffset = window.util.getOffset;
  const setAddressValue = window.form.setAddressValue;

  const halfOfPinMain = getOffset(mapPinMain).x;
  const limitedArea = {
    TOP: 130,
    BOTTOM: 630,
    left: 0 - halfOfPinMain,
    right: getWidth(map) - halfOfPinMain
  };


  function mapPinMainStartDrag(evt) {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    const mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      if (mapPinMain.offsetLeft <= limitedArea.left) {
        mapPinMain.style.left = 0 + `px`;
      } else if (mapPinMain.offsetLeft >= limitedArea.right) {
        mapPinMain.style.left = (limitedArea.right - halfOfPinMain) + `px`;
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;
      }


      if (mapPinMain.offsetTop < limitedArea.TOP) {
        mapPinMain.style.top = limitedArea.TOP + `px`;
      } else if (mapPinMain.offsetTop > limitedArea.BOTTOM) {
        mapPinMain.style.top = limitedArea.BOTTOM - halfOfPinMain + `px`;
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      }
    };


    const mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      const adFormAddress = window.variables.form.adFormAddress;
      const getCoordinateOfPinMain = window.util.getCoordinateOfPinMain();

      setAddressValue(adFormAddress, getCoordinateOfPinMain);

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  }


  window.dragPinMain = mapPinMainStartDrag;

})();

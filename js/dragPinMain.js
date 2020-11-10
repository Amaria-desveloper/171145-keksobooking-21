'use strict';
/*
* Логика перемещения главной метки.
*/
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
  right: getWidth(map) - halfOfPinMain,
};

const checkNewPosition = (property, currentPosition, limitedAreaStart, limitedAreaEnd) => {
  if (currentPosition < limitedAreaStart) {
    mapPinMain.style[property] = limitedAreaStart + `px`;
  } else if (currentPosition > limitedAreaEnd) {
    mapPinMain.style[property] = limitedAreaEnd + `px`;
  } else {
    mapPinMain.style[property] = currentPosition + `px`;
  }
};

const mapPinMainMouseDownHandler = (evt) => {
  evt.preventDefault();

  let startCoordinates = {
    x: evt.clientX,
    y: evt.clientY,
  };

  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY,
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    const movedCoordinates = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y,
    };

    checkNewPosition(`left`, movedCoordinates.x, limitedArea.left, limitedArea.right);
    checkNewPosition(`top`, movedCoordinates.y, limitedArea.TOP, limitedArea.BOTTOM);
  };


  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();

    const adFormAddress = window.variables.form.adFormAddress;
    const getCoordinateOfPinMain = window.util.getCoordinateOfPinMain();

    setAddressValue(adFormAddress, getCoordinateOfPinMain);

    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
};


window.dragPinMain = mapPinMainMouseDownHandler;

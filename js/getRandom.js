'use strict';

(function () {

  function getInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function getArrIndex(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getArr(arr) {
    let randNum = getInteger(0, arr.length - 1);
    let randomArr = arr.slice(randNum);
    return randomArr;
  }

  window.random = {
    getInteger,
    getArrIndex,
    getArr
  };

})();


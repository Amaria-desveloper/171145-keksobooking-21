'use strict';
(function () {
  /*
  * Фильтрует входящие данные по [houseType].
  * Возвращает новый массив, состоящий из data, содержащих [houseType].
  */
  const makeFilter = function (data, houseType) {

    const sameType = {
      "houseType": data.filter(function (datum) {
        return datum.offer.type === houseType;
      })
    };

    return sameType.houseType;
  };


  window.makeFilter = {
    makeFilter
  };

})();

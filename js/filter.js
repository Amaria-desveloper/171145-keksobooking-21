'use strict';
(function () {
  /*
  * Фильтрует входящие данные
  * Возвращает новый массив, состоящий из data, прошедшие проверки.
  */
  const mapFilter = window.variables.map.mapFilter;
  const mapFiltersHousingType = mapFilter.querySelector(`select[name="housing-type"]`);
  const mapFiltersHousingPrice = mapFilter.querySelector(`.map__filters select[name="housing-price"]`);
  const mapFiltersHousingRooms = mapFilter.querySelector(`.map__filters select[name="housing-rooms"]`);
  const mapFiltersHousingGuests = mapFilter.querySelector(`.map__filters select[name="housing-guests"]`);


  function makeFilter(data) {

    function getValueChecked() {
      let mapFilterHousingFeatures = mapFilter.querySelectorAll(`.map__filters .map__features input[name="features"]:checked`);
      let valueChecked = [];
      Array.from(mapFilterHousingFeatures).map(function (feature) {
        valueChecked.push(feature.value);
      });
      return valueChecked;
    }


    function filteredChoosed() {
      let pattern = {
        type: mapFiltersHousingType.value,
        price: {
          min: 0,
          max: Infinity
        },

        rooms: ``,
        guests: ``,
        features: getValueChecked()
      };

      if (mapFiltersHousingType.value === `any`) {
        pattern.type = ``;
      }

      if (mapFiltersHousingPrice.value !== `any`) {
        if (mapFiltersHousingPrice.value === `low`) {
          pattern.price.max = 10000;
        } else if (mapFiltersHousingPrice.value === `middle`) {
          pattern.price.min = 10000;
          pattern.price.max = 50000;
        } else {
          pattern.price.min = 50000;
        }
      }

      if (mapFiltersHousingRooms.value !== `any`) {
        pattern.rooms = Number(mapFiltersHousingRooms.value, 0);
      }

      if (mapFiltersHousingGuests.value !== `any`) {
        pattern.guests = Number(mapFiltersHousingGuests.value, 0);
      }

      return pattern;
    }


    let pattern = filteredChoosed();

    let availableAdverts = data.filter(function (datum) {
      let condType = datum.offer.type === pattern.type || pattern.type === ``;
      let condPrice = datum.offer.price >= pattern.price.min && datum.offer.price < pattern.price.max;
      let condRooms = datum.offer.rooms === pattern.rooms || pattern.rooms === ``;
      let condGuests = datum.offer.guests === pattern.guests || pattern.guests === ``;
      let condFeatures = pattern.features.every(function (feature) {
        return datum.offer.features.includes(feature);
      });

      return condType && condPrice && condRooms && condGuests && condFeatures;
    });

    return availableAdverts;
  }


  window.filter = {
    makeFilter
  };

})();

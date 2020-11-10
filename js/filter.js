'use strict';
/*
* Фильтрует входящие данные
* Возвращает новый массив, состоящий из data, прошедшие проверки.
*/
const mapFilter = window.variables.map.mapFilter;
const mapFiltersHousingType = mapFilter.querySelector(`select[name="housing-type"]`);
const mapFiltersHousingPrice = mapFilter.querySelector(`.map__filters select[name="housing-price"]`);
const mapFiltersHousingRooms = mapFilter.querySelector(`.map__filters select[name="housing-rooms"]`);
const mapFiltersHousingGuests = mapFilter.querySelector(`.map__filters select[name="housing-guests"]`);
const FilterLimit = {
  MIN: 10000,
  MAX: 50000,
};


const makeFilter = (data) => {
  const getValueChecked = () => {
    let mapFilterHousingFeatures = mapFilter.querySelectorAll(`.map__filters .map__features input[name="features"]:checked`);
    let valueChecked = [];
    Array.from(mapFilterHousingFeatures).map((feature) => {
      valueChecked.push(feature.value);
    });
    return valueChecked;
  };


  const filteredChoosed = () => {
    let pattern = {
      type: mapFiltersHousingType.value,
      price: {
        min: 0,
        max: Infinity,
      },

      rooms: ``,
      guests: ``,
      features: getValueChecked(),
    };

    if (mapFiltersHousingType.value === `any`) {
      pattern.type = ``;
    }

    if (mapFiltersHousingPrice.value !== `any`) {
      if (mapFiltersHousingPrice.value === `low`) {
        pattern.price.max = FilterLimit.MIN;
      } else if (mapFiltersHousingPrice.value === `middle`) {
        pattern.price.min = FilterLimit.MIN;
        pattern.price.max = FilterLimit.MAX;
      } else {
        pattern.price.min = FilterLimit.MAX;
      }
    }

    if (mapFiltersHousingRooms.value !== `any`) {
      pattern.rooms = Number(mapFiltersHousingRooms.value, 0);
    }

    if (mapFiltersHousingGuests.value !== `any`) {
      pattern.guests = Number(mapFiltersHousingGuests.value, 0);
    }

    return pattern;
  };


  let pattern = filteredChoosed();

  return data.filter((datum) => {
    let condType = datum.offer.type === pattern.type || pattern.type === ``;
    let condPrice = datum.offer.price >= pattern.price.min && datum.offer.price < pattern.price.max;
    let condRooms = datum.offer.rooms === pattern.rooms || pattern.rooms === ``;
    let condGuests = datum.offer.guests === pattern.guests || pattern.guests === ``;
    let condFeatures = pattern.features.every((feature) => {
      return datum.offer.features.includes(feature);
    });

    return condType && condPrice && condRooms && condGuests && condFeatures;
  });
};


window.filter = {
  makeFilter,
};

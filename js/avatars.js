'use strict';

(function () {
  /**
  * Создаёт названия файлов (аватаров) по заданному шаблону. Количество итоговых элементов зависит от передаваемого параметра.
  * @param {number} quantity - передаваемый параметр
  * @return {array} avatars - получаемый массив
  */
  window.getAvatars = function getAvatars(quantity) {
    const avatars = [];
    for (let i = 0; i < quantity; i++) {
      avatars[i] = `img/avatars/user0` + (1 + i) + `.png`;
    }
    return avatars;
  };

})();

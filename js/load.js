'use strict';
/*
* Получает данные с сервера
* TIMEOUT 10000 = 10s
*/
(function () {
  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const TIMEOUT = 10000;

  const StatusCode = {
    OK: 200
  };


  const downloadData = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;


    xhr.addEventListener(`load`, function () {
      let error = ``;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 404:
          error = `Ничего не найдено. (По этому URL пусто)`;
          break;

        default:
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }

      if (error) {
        onError(error);
      }

    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + TIMEOUT + `мс`);
    });


    xhr.open(`GET`, DATA_URL);
    xhr.send();
  };

  window.load = {
    downloadData
  };
})();

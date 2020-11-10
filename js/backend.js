'use strict';
/*
* Получает данные с сервера
* TIMEOUT 10000 = 10s
*/
const TIMEOUT = 10000;
const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_POST = `https://21.javascript.pages.academy/keksobooking`;

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL: 500,
};


const createXHR = (onSuccess, onError, method, url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.timeout = TIMEOUT;
  xhr.open(method, url);
  xhr.send(data);

  xhr.addEventListener(`load`, () => {
    let error = ``;
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;

      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.NOT_FOUND:
        error = `Ничего не найдено. (По этому URL пусто)`;
        break;
      case StatusCode.INTERNAL:
        error = `Сервис сломался, попробуйте позже`;
        break;

      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${TIMEOUT} мс`);
  });

  return xhr;
};

const load = (onSuccess, onError) => {
  createXHR(onSuccess, onError, `GET`, DATA_URL);
};

const save = (onSuccess, onError, data) => {
  createXHR(onSuccess, onError, `POST`, URL_POST, data);
};

window.backend = {
  load,
  save,
};

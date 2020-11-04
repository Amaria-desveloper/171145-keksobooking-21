'use strict';
/*
* Модальные окна с сообщениями для пользователя
*/
(function () {
  const closeCard = window.util.closeCard;
  const addPinOnMap = window.pin.addPinOnMap;
  const modalLayout = window.util.modalLayout;

  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);


  /*
  * В случае успешной загрузки данных с сервера...
  */
  const successDataHandler = function (data) {
    addPinOnMap(data);
  };


  /*
  * В случае ошибки загрузки данных с сервера: формируется окно с сообщением
  * @param {String} errorMessage. errorMessage - на выбор в load.js
  */
  const errorDataHandler = function (errorMessage) {
    document.body.insertAdjacentElement(`afterbegin`, modalLayout(errorMessage));
    const modal = document.querySelector(`#modal`);
    const button = document.querySelector(`#modalButton`);
    button.focus();

    const buttonClickHandler = function (evt) {
      evt.preventDefault();
      closeCard(modal);
    };

    const buttonEscHandler = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeCard(modal);
      }
      document.removeEventListener(`keydown`, buttonEscHandler);
    };

    button.addEventListener(`click`, buttonClickHandler);
    document.addEventListener(`keydown`, buttonEscHandler);
  };


  /*
  * Ловят событие Submit на форме. Показывает сообщение в случае успеха/неудачи.
  */
  /**/
  /*
  * Ловит событие на закрытие модального окна с сообщением для пользователя
  */
  const messageCloseHandler = function () {
    let modalSuccess = document.querySelector(`.success`);
    let modalError = document.querySelector(`.error`);

    if (modalError) {
      closeCard(modalError);
    }

    if (modalSuccess) {
      closeCard(modalSuccess);
    }

    document.removeEventListener(`click`, messageCloseHandler);
    document.removeEventListener(`keydown`, messageCloseEscHandler);
  };

  /*
  * Ловит esc на закрытие модального окна
  */
  const messageCloseEscHandler = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      messageCloseHandler();
    }
  };


  /*
  * Формирует и добавляет DOM модальное окно на основе переданного шаблона.
  * @param {} template шаблон
  */
  function showMessage(template, messageText) {
    const element = template.cloneNode(true);

    if (template === errorMessageTemplate) {
      element.querySelector(`.error__message`).textContent = messageText;
    }

    document.body.insertAdjacentElement(`afterbegin`, element);
    element.tabIndex = 0;
    element.focus();
  }


  /*
  * Если форма отправлена успешно.... верни исходное состояние (f window.main.restartPage)
  */
  function sendIsSuccess() {
    showMessage(successMessageTemplate);

    window.main.restartPage();

    document.addEventListener(`click`, messageCloseHandler);
    document.addEventListener(`keydown`, messageCloseEscHandler);
  }


  /*
  * При отправке формы произошла ошибка...
  */
  function sendIsError(messageText) {
    showMessage(errorMessageTemplate, messageText);

    const modalError = document.querySelector(`.error`);
    const errorMessageButton = modalError.querySelector(`.error__button`);

    errorMessageButton.addEventListener(`click`, messageCloseHandler);
    document.addEventListener(`keydown`, messageCloseEscHandler);
  }


  window.notices = {
    errorDataHandler,
    sendIsSuccess,
    sendIsError,
    successDataHandler
  };

})();

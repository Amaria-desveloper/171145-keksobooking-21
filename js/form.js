'use strict';

(function () {
  const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;
  const close = window.util.close;

  const adForm = window.variables.form.adForm;
  const adFormAddress = window.variables.form.adFormAddress;
  const adFormAvatar = window.variables.form.adFormAvatar;
  const adFormType = window.variables.form.adFormType;
  const adFormPrice = window.variables.form.adFormPrice;
  const adFormCapacity = window.variables.form.adFormCapacity;
  const adFormImages = window.variables.form.adFormImages;
  const adFormRoomNumber = window.variables.form.adFormRoomNumber;

  const adFormTimeIn = document.querySelector(`#timein`);
  const adFormTimeOut = document.querySelector(`#timeout`);
  const adFormAvatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const adFormPhoto = document.querySelector(`.ad-form__photo`);
  const containerAdFormPhoto = document.querySelector(`.ad-form__photo-container`);
  const adFormButtonReset = document.querySelector(`.ad-form__reset`);


  /*
  * Устанавливает адрес главной метки.
  * @external Node
  * @param {external:Node} inputElement - DOM-элемент input, куда записывается адрес.
  * @param {function} newValueFrom - Откуда брать координаты. В качестве параметра - функция(getPositionOfElement), которая  высчитывает координаты;
  * @return
  */
  const setAddressValue = (inputElement, newValueFrom) => {
    inputElement.value = newValueFrom;
  };


  /*
  * Устанавливает форму в инициализирующее состояние.
  */
  const installDefaultForm = () => {
    for (let i = 1; i < adFormCapacity.length; i++) {
      adFormCapacity[i].setAttribute(`style`, `display: none`);
    }

    adFormAddress.setAttribute(`style`, `color: brown`);
    adFormAddress.setAttribute(`readonly`, `true`);

    adFormPrice.placeholder = `1000`;
    adFormPrice.setAttribute(`min`, TYPE_MIN_PRICE[adFormType.value]);
    adFormPrice.setAttribute(`max`, `1000000`);

    adFormAvatar.setAttribute(`accept`, `image/*`);

    adFormImages.setAttribute(`accept`, `image/*`);
    adFormImages.multiple = true;
  };


  /* синхронизация значений полей Время заезда и выезда */
  const syncValues = (firstElement, secondElement) => {
    firstElement.addEventListener(`change`, function () {
      secondElement.value = firstElement.value;
    });

    secondElement.addEventListener(`change`, function () {
      firstElement.value = secondElement.value;
    });
  };

  syncValues(adFormTimeIn, adFormTimeOut);


  /* показать превью аватара */
  const showAvatarPreview = (fileUploadElement) => {
    adFormAvatarPreview.src = URL.createObjectURL(fileUploadElement.files[0]);
  };


  /* Показать превью загруженных картинок */
  const showImagesPreview = (fileUploadElement) => {
    let photo = document.createElement(`img`);
    photo.setAttribute(`width`, `100%`);
    photo.setAttribute(`height`, `100%`);
    photo.src = URL.createObjectURL(fileUploadElement.files[0]);
    adFormPhoto.appendChild(photo);

    if (fileUploadElement.files.length > 1) {
      let fragment = document.createDocumentFragment();
      for (let i = 1; i < fileUploadElement.files.length; i++) {
        let element = adFormPhoto.cloneNode(true);
        photo.setAttribute(`width`, `100%`);
        photo.setAttribute(`height`, `100%`);
        photo.src = URL.createObjectURL(fileUploadElement.files[i]);
        fragment.appendChild(element);
      }
      containerAdFormPhoto.appendChild(fragment);
    }
  };

  /*
  * Сбросить превью загруженных фото
  */
  const removeImagesPreview = () => {
    const loadedPhotos = containerAdFormPhoto.querySelectorAll(`img`);
    const loadedPhotoWrappers = containerAdFormPhoto.querySelectorAll(`.ad-form__photo`);

    for (let photo of loadedPhotos) {
      close(photo);
    }

    for (let i = 1; i < loadedPhotoWrappers.length; i++) {
      close(loadedPhotoWrappers[i]);
    }

    adFormAvatarPreview.src = `img/muffin-grey.svg`;
  };

  /*
  * Сбросить форму
  */
  const formReset = (form) => {
    form.reset();
    removeImagesPreview();
    adFormRoomNumber.selectedIndex = 0;
    adFormCapacity.selectedIndex = 0;
  };


  const formButtonResetHandler = function formButtonResetHandler(evt) {
    evt.preventDefault();
    formReset(adForm);
    window.main.restartPage();
  };

  adFormButtonReset.addEventListener(`click`, formButtonResetHandler);


  window.form = {
    setAddressValue,
    installDefaultForm,
    showAvatarPreview,
    showImagesPreview,
    formReset
  };
})();

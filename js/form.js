'use strict';

(function () {
  const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;

  const adFormAddress = window.variables.form.adFormAddress;
  const adFormAvatar = window.variables.form.adFormAvatar;
  const adFormType = window.variables.form.adFormType;
  const adFormPrice = window.variables.form.adFormPrice;
  const adFormCapacity = window.variables.form.adFormCapacity;
  const adFormImages = window.variables.form.adFormImages;

  const adFormTimeIn = document.querySelector(`#timein`);
  const adFormTimeOut = document.querySelector(`#timeout`);
  const adFormAvatarPreview = document.querySelector(`.ad-form-header__preview img`);
  const adFormPhoto = document.querySelector(`.ad-form__photo`);
  const containerAdFormPhoto = document.querySelector(`.ad-form__photo-container`);


  /*
  * Устанавливает адрес главной метки.
  * @external Node
  * @param {external:Node} inputElement - DOM-элемент input, куда записывается адрес.
  * @param {function} newValueFrom - Откуда брать координаты. В качестве параметра - функция(getPositionOfElement), которая  высчитывает координаты;
  * @return
  */
  function setAddressValue(inputElement, newValueFrom) {
    let newValue = newValueFrom;
    inputElement.value = newValue;
  }


  /*
  * Устанавливает форму в инициализирующее состояние.
  */
  function installDefaultForm() {
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
  }


  /* синхронизация значений полей Время заезда и выезда */
  function syncValues(firstElement, secondElement) {
    firstElement.addEventListener(`change`, function () {
      secondElement.value = firstElement.value;
    });

    secondElement.addEventListener(`change`, function () {
      firstElement.value = secondElement.value;
    });
  }
  syncValues(adFormTimeIn, adFormTimeOut);


  /* показать превью аватара */
  function showAvatarPreview(fileUploadElement) {
    adFormAvatarPreview.src = URL.createObjectURL(fileUploadElement.files[0]);
  }


  /* Показать превью загруженных картинок */
  function showImagesPreview(fileUploadElement) {

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
  }

  window.form = {
    setAddressValue,
    installDefaultForm,
    showAvatarPreview,
    showImagesPreview
  };
})();

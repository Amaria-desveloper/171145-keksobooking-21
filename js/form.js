'use strict';

(function () {
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
    const capacity = document.querySelector(`#capacity`);
    for (let i = 1; i < capacity.length; i++) {
      capacity[i].setAttribute(`style`, `display: none`);
    }

    let address = document.querySelector(`#address`);
    let price = document.querySelector(`#price`);
    let avatar = document.querySelector(`#avatar`);
    let images = document.querySelector(`#images`);

    address.setAttribute(`style`, `color: brown`);
    address.setAttribute(`readonly`, `true`);

    const fieldType = document.querySelector(`#type`);

    const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;
    price.placeholder = `1000`;
    price.setAttribute(`min`, TYPE_MIN_PRICE[fieldType.value]);
    price.setAttribute(`max`, `1000000`);

    avatar.setAttribute(`accept`, `image/*`);

    images.setAttribute(`accept`, `image/*`);
    images.multiple = true;
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
  syncValues(document.querySelector(`#timein`), document.querySelector(`#timeout`));


  /* показать превью аватара */
  function showAvatarPreview(fileUploadElement) {
    document.querySelector(`.ad-form-header__preview img`).src = URL.createObjectURL(fileUploadElement.files[0]);
  }


  /* Показать превью загруженных картинок */
  function showImagesPreview(fileUploadElement) {
    const adFormPhoto = document.querySelector(`.ad-form__photo`);
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
      document.querySelector(`.ad-form__photo-container`).appendChild(fragment);
    }
  }

  window.form = {
    setAddressValue,
    installDefaultForm,
    showAvatarPreview,
    showImagesPreview
  };
})();

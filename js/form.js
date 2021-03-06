'use strict';
const TYPE_MIN_PRICE = window.constants.TYPE_MIN_PRICE;
const closeElement = window.util.closeElement;

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
};


/* синхронизация значений полей Время заезда и выезда */
const syncValues = (firstElement, secondElement) => {
  firstElement.addEventListener(`change`, () => {
    secondElement.value = firstElement.value;
  });

  secondElement.addEventListener(`change`, () => {
    firstElement.value = secondElement.value;
  });
};

syncValues(adFormTimeIn, adFormTimeOut);

/* Проверка типа загружаемого файла */
const checkFileType = (preview) => {
  const FILE_TYPES = [`image/gif`, `image/jpg`, `image/jpeg`, `image/png`];
  return FILE_TYPES.includes(preview[`type`]);
};

const createImageBox = (photo) => {
  let imageBox = document.createElement(`img`);
  imageBox.setAttribute(`width`, `100%`);
  imageBox.setAttribute(`height`, `100%`);
  imageBox.src = URL.createObjectURL(photo);
  return imageBox;
};

/* показать превью аватара */
const showAvatarPreview = (fileUploadElement) => {
  let preview = fileUploadElement.files[0];
  let matches = checkFileType(preview);
  if (matches) {
    adFormAvatarPreview.src = URL.createObjectURL(preview);
  }
};


/* Показать превью загруженных картинок */
const showImagesPreview = (fileUploadElement) => {
  let preview = fileUploadElement.files[0];
  let matches = checkFileType(preview);
  let imageBox = adFormPhoto.querySelector(`img`);

  if (matches) {
    if (!imageBox) {
      adFormPhoto.appendChild(createImageBox(preview));
    } else {
      imageBox.src = URL.createObjectURL(preview);
    }
  }
};

/*
* Сбросить превью загруженных фото
*/
const removeImagesPreview = () => {
  const loadedPhoto = adFormPhoto.querySelector(`img`);

  if (loadedPhoto) {
    closeElement(loadedPhoto);
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


const formButtonResetHandler = (evt) => {
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

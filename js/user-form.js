import {isEscapeKey} from './util.js';
import {pristine} from './form-validation.js';
import {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effect-sliders.js';
import {sendData} from './api.js';
import {uploadUserPhoto} from './user-photo.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const effectNone = document.querySelector('#effect-none');
const descriptionField = document.querySelector('[name="description"]');
const hashtagsField = document.querySelector('[name="hashtags"]');
const loadErrorMessage = document.querySelector('.load-error-message');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');


uploadFile.addEventListener('input', openFormEditImg);

const bringToDefaults = () => {
  changeImageScale(DEFAULT_SCALE_VALUE);
  setSlider('none');
  hashtagsField.value = '';
  descriptionField.value = '';
  effectNone.checked = true;
};

const submitForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const addSubmitButtonHandler = () => {
  imgUploadForm.addEventListener('submit', submitForm);
};

const removeSubmitButtonHandler = () => {
  imgUploadForm.removeEventListener('submit', submitForm);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEditImg();
  }
};

function openFormEditImg () {
  uploadUserPhoto();
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeFormEditImg);
  document.addEventListener('keydown', onPopupEscKeydown);
  bringToDefaults();
  addSubmitButtonHandler();
  addEffectsListClickHandler();
  addZoomButtonsClickHandlers();
  loadErrorMessage.classList.add('hidden');
}

function closeFormEditImg() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeFormEditImg);
  document.removeEventListener('keydown', onPopupEscKeydown);
  imgUploadInput.value = '';
  removeSubmitButtonHandler();
  removeEffectsListClickHandler();
  removeZoomButtonsClickHandlers();
  loadErrorMessage.classList.remove('hidden');
}

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

const closeSuccessUploadMessage = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onSuccessOuterAreaClick);
  closeFormEditImg();
};

const closeErrorUploadMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onErrorOuterAreaClick);
  closeFormEditImg();
};

const showSuccessUploadMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  bringToDefaults();
  document.querySelector('.success__button').addEventListener('click', closeSuccessUploadMessage);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onSuccessOuterAreaClick);
};

const showErrorUploadMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  bringToDefaults();
  document.querySelector('.error__button').addEventListener('click', closeErrorUploadMessage);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onErrorOuterAreaClick);
};

function onSuccessEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessUploadMessage();
  }
}

function onErrorEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorUploadMessage();
  }
}

function onSuccessOuterAreaClick(evt) {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessUploadMessage();
  }
}

function onErrorOuterAreaClick(evt) {
  if (evt.target.closest('.error__inner') === null) {
    closeErrorUploadMessage();
  }
}

const setUserFormSubmit = (onSuccess, onError) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(
        () => {
          onSuccess();
        },
        () => {
          onError();
        },
        new FormData(imgUploadForm)
      );
    }
  });
};

export {showErrorUploadMessage, showSuccessUploadMessage, setUserFormSubmit};

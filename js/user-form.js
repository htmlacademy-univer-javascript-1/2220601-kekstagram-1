import {isEscapeKey, checkLength} from './util.js';
import {HASHTAGS_COUNT, COMMENTS_LENGTH, REG_EXP} from './data.js';
import {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE} from './scale-control.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effect-sliders.js';

const imgInput = document.querySelector('.img-upload__input');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const defaultImg = document.querySelector('#effect-none');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

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

function onEditorCloseButtonClick () {
  closeFormEditImg();
}

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormEditImg();
  }
};

function closeFormEditImg() {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', onEditorCloseButtonClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
  imgInput.value = '';
  removeSubmitButtonHandler();
  removeEffectsListClickHandler();
  removeZoomButtonsClickHandlers();
}

uploadCancel.addEventListener('click', () => {
  closeFormEditImg();
});

const validateHashtagFormat = (value) => {
  if (value === '') {
    return true;
  }
  else {
    return value.split(' ').every((hashtag) => REG_EXP.test(hashtag));
  }
};

const validateHashtagCount = (value) => value.split(' ').length <= HASHTAGS_COUNT;

const validateDublicateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

pristine.addValidator(
  textHashtags,
  validateDublicateHashtag,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  textHashtags,
  validateHashtagCount,
  'Максимум 5 хэштегов'
);

pristine.addValidator(
  textHashtags,
  validateHashtagFormat,
  'Формат хэштега: #hashtag, длина менее 20 символов'
);

pristine.addValidator(
  textDescription,
  (comment) => checkLength(comment, COMMENTS_LENGTH),
  'Комментарий не должен превышать 140 символов'
);

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

function openFormEditImg () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', onEditorCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  defaultImg.checked = true;
  addSubmitButtonHandler();
  addEffectsListClickHandler();
  changeImageScale(DEFAULT_SCALE_VALUE);
  addZoomButtonsClickHandlers();
  setSlider('none');
}

uploadFile.addEventListener('input', openFormEditImg);

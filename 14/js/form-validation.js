import {checkLength} from './util.js';

const REG_EXP = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/;
const COMMENTS_LENGTH = 140;
const HASHTAGS_COUNT = 5;
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
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

export {pristine};

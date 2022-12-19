import './user-form.js';
import {getData} from './api.js';
import {showErrorUploadMessage, showSuccessUploadMessage, setUserFormSubmit} from './user-form.js';
import {showAlert} from './messages.js';
import {initFilters} from './filter.js';

getData(
  (pictures) => {
    initFilters(pictures);
  },
  () => {
    showAlert('Не удалось загрузить данные. Перезагрузите страницу либо попробуйте позже, мы уже исправляем это!');
  });

setUserFormSubmit(
  () => {
    showSuccessUploadMessage();
  },
  () => {
    showErrorUploadMessage();
  }
);

import './render.js';
import './user-form.js';
import {getData} from './api.js';
import {showErrorUploadMessage, showSuccessUploadMessage, setUserFormSubmit} from './user-form.js';
import {renderPictures} from './render.js';
import { showAlert } from './messages.js';

getData(
  (pictures) => {
    renderPictures(pictures);
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

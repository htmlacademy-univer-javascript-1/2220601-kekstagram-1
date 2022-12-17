import {renderBigPicture} from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const renderPicture = (image) => {
  const picture = templateFragment.cloneNode(true);
  picture.querySelector('.picture__img').src = image.url;
  picture.querySelector('.picture__likes').textContent = image.likes;
  picture.querySelector('.picture__comments').textContent = image.comments.length;
  renderBigPicture(picture, image);

  return picture;
};

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    renderPicture(picture);
    fragment.appendChild(renderPicture(picture));
  });
  picturesContainer.appendChild(fragment);
};


export {renderPictures};

import {createPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();
const descriptions = createPhotos();

const createMiniatures = () => {
  descriptions.forEach((description) => {
    const picture = templateFragment.cloneNode(true);

    picture.querySelector('.picture__img').src = description.url;
    picture.querySelector('.picture__likes').textContent = description.likes;
    picture.querySelector('.picture__comments').textContent = description.comment.length;

    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
};

createMiniatures();

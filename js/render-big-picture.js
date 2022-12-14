import {isEscapeKey} from './util.js';
import {UPLOAD_COMMENTS_COUNT, DEFAULT_COMMENTS_COUNT} from './data.js';


const bigPicture = document.querySelector('.big-picture');
const socialComment = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');

const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const description = bigPicture.querySelector('.social__caption');

let currentPhotoComments;

const closeBigPicture  = ()  => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', loadMoreComments);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const closeClickHandler =  () => {
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const addComments = (container, comments) => {
  container.innerHTML = '';
  comments.forEach((commentInfo) => {
    const newComment = socialComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    container.append(newComment);
  });
  updateCommentsCount();
};

function updateCommentsCount () {
  const currentCommentsCount = commentsList.children.length;
  if (currentCommentsCount === currentPhotoComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = '';
  socialCommentCount.insertAdjacentHTML('beforeend',
    `${currentCommentsCount} из <span class="comments-count">${currentPhotoComments.length}</span> комментариев`);
}

function loadMoreComments () {
  const currentCommentsCount = commentsList.children.length;
  addComments(commentsList, currentPhotoComments.slice(0, currentCommentsCount + UPLOAD_COMMENTS_COUNT));
}

const renderBigPicture = (photo, pictures) => {
  photo.addEventListener('click', () => {
    currentPhotoComments = pictures.comments;
    img.src = pictures.url;
    likes.textContent = pictures.likes;
    commentsCount.textContent = pictures.comments.length;
    description.textContent = pictures.description;
    addComments(commentsList, currentPhotoComments.slice(0, DEFAULT_COMMENTS_COUNT));

    bigPicture.classList.remove('hidden');
    commentsLoader.addEventListener('click', loadMoreComments);
    document.querySelector('body').classList.add('modal-open');
    closeClickHandler();
  });
};

export {renderBigPicture};

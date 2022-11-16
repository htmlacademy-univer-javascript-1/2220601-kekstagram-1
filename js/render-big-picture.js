const bigPicture = document.querySelector('.big-picture');
const comment = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeBigPicture  = ()  => {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeEscape);
};


function closeEscape (evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

const closeClickHandler =  () => {
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', closeEscape);
};


const addComments = (container, comments) => {
  container.innerHTML = '';
  comments.forEach((commentInfo) => {
    const newComment = comment.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    container.append(newComment);
  });
};


const bigPictureRender = (photo, pictures) => {
  photo.addEventListener('click', () => {
    const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
    const likes = bigPicture.querySelector('.likes-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const comments = bigPicture.querySelector('.social__comments');
    const description = bigPicture.querySelector('.social__caption');

    img.src = pictures.url;
    likes.textContent = pictures.likes;
    commentsCount.textContent = pictures.comments.length;
    description.textContent = pictures.description;
    addComments(comments, pictures.comments);

    bigPicture.classList.remove('hidden');
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    closeClickHandler();
  });
};

export {bigPictureRender};

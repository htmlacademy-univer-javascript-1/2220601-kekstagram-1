const bigPicture = document.querySelector('.big-picture');
const comment = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const fullVersion  = ()  => {
  bigPicture.classList.toggle('hidden');
  socialCommentCount.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
};


const closeEscape = (evt) => {
  if (evt.key === 'Escape') {
    fullVersion();
  }
};


const closeClickHandler =  () => {
  closeButton.addEventListener('click', fullVersion);
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

    fullVersion();
  });
  closeClickHandler();
};

export {bigPictureRender};

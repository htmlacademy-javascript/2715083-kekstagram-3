import { PHOTOS } from './photo-data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentShownCount = document.querySelector('.social__comment-shown-count');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const pictureCancel = document.querySelector('#picture-cancel');

const fillBigPicture = function (photo) {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentTotalCount.textContent = photo.comments.length;
  commentShownCount.textContent = photo.comments.length;

  socialComments.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('social__picture');
    avatarImg.src = comment.avatar;
    avatarImg.alt = comment.name;
    avatarImg.width = 35;
    avatarImg.height = 35;
    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentElement.appendChild(avatarImg);
    commentElement.appendChild(commentText);
    socialComments.appendChild(commentElement);
  });
};

const openBigPicture = function (photo) {
  fillBigPicture(photo);
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
};

document.querySelector('.pictures').addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');

  if (pictureElement) {
    evt.preventDefault();
    const allPictures = document.querySelectorAll('.picture');
    const index = Array.from(allPictures).indexOf(pictureElement);
    openBigPicture(PHOTOS[index]);
  }
});

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
});


export { openBigPicture, closeBigPicture };

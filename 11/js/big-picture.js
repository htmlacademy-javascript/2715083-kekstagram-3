import { PHOTOS } from './photo-data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const pictureCancel = bigPicture.querySelector('#picture-cancel');

let currentComments = [];
let shownCommentsCount = 0;

const fillBigPicture = function (photo) {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentTotalCount.textContent = photo.comments.length;
  socialComments.innerHTML = '';
};

const renderCommentsBatch = function () {
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + 5);

  nextComments.forEach((comment) => {
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

  shownCommentsCount += nextComments.length;
  commentShownCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const openBigPicture = function (photo) {
  fillBigPicture(photo);
  currentComments = photo.comments;
  shownCommentsCount = 0;
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  renderCommentsBatch();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

commentsLoader.addEventListener('click', () => {
  renderCommentsBatch();
});

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

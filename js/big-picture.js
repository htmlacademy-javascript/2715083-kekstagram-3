const COMMENTS_PER_BATCH = 5;
const AVATAR_SIZE = 35;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const pictureCancelElement = bigPictureElement.querySelector('#picture-cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let currentComments = [];
let shownCommentsCount = 0;

const fillBigPicture = (photo) => {
  bigPictureImageElement.src = photo.url;
  bigPictureImageElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;
  commentTotalCountElement.textContent = photo.comments.length;
  socialCommentsElement.innerHTML = '';
};

const renderCommentsBatch = () => {
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PER_BATCH
  );

  nextComments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const avatarElement = document.createElement('img');
    avatarElement.classList.add('social__picture');
    avatarElement.src = comment.avatar;
    avatarElement.alt = comment.name;
    avatarElement.width = AVATAR_SIZE;
    avatarElement.height = AVATAR_SIZE;

    const commentTextElement = document.createElement('p');
    commentTextElement.classList.add('social__text');
    commentTextElement.textContent = comment.message;

    commentElement.append(avatarElement, commentTextElement);
    socialCommentsElement.appendChild(commentElement);
  });

  shownCommentsCount += nextComments.length;
  commentShownCountElement.textContent = shownCommentsCount;
  commentsLoaderElement.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture(photo) {
  fillBigPicture(photo);
  currentComments = photo.comments;
  shownCommentsCount = 0;
  commentCountElement.classList.remove('hidden');
  renderCommentsBatch();
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onCommentsLoaderClick = () => {
  renderCommentsBatch();
};

const onPictureCancelClick = () => {
  closeBigPicture();
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

const initBigPicture = (getPhotos) => {
  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (!pictureElement) {
      return;
    }

    evt.preventDefault();
    const photo = getPhotos().find((item) => String(item.id) === pictureElement.dataset.id);
    if (photo) {
      openBigPicture(photo);
    }
  });

  pictureCancelElement.addEventListener('click', onPictureCancelClick);
};

export { initBigPicture };

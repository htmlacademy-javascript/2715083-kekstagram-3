const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const createMiniature = (photo) => {
  const photoElement = pictureTemplate.cloneNode(true);
  const pictureElement = photoElement.querySelector('.picture');
  const imageElement = photoElement.querySelector('.picture__img');
  const commentsCountElement = photoElement.querySelector('.picture__comments');
  const likesCountElement = photoElement.querySelector('.picture__likes');

  pictureElement.dataset.id = photo.id;
  imageElement.src = photo.url;
  imageElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;

  return photoElement;
};

const renderMiniatures = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.appendChild(createMiniature(photo)));
  picturesContainerElement.appendChild(fragment);
};

const clearMiniatures = () => {
  picturesContainerElement.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

export { renderMiniatures, clearMiniatures };

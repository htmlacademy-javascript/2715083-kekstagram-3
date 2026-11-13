const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const createMiniature = (photo) => {
  const photoElement = pictureTemplate.cloneNode(true);
  const link = photoElement.querySelector('.picture');
  const img = photoElement.querySelector('.picture__img');
  const comments = photoElement.querySelector('.picture__comments');
  const likes = photoElement.querySelector('.picture__likes');

  link.dataset.id = photo.id;
  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  return photoElement;
};

const renderMiniatures = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => fragment.appendChild(createMiniature(photo)));
  picturesContainer.appendChild(fragment);
};

const clearMiniatures = () => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
};

export { renderMiniatures, clearMiniatures };

import {PHOTOS} from './photo-data.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');
const pictureTemplate = document.querySelector('#picture').content;

const createMiniature = function(photo) {
  const photoElement = pictureTemplate.cloneNode(true);
  const img = photoElement.querySelector('.picture__img');
  const comments = photoElement.querySelector('.picture__comments');
  const likes = photoElement.querySelector('.picture__likes');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  return photoElement;
};

const renderMiniatures = function(photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const miniature = createMiniature(photo);
    fragment.appendChild(miniature);
  });
  picturesContainer.appendChild(fragment);
};

renderMiniatures(PHOTOS);

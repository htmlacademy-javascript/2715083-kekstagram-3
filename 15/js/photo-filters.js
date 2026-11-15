import { renderMiniatures, clearMiniatures } from './rendering-miniature.js';

const RANDOM_PHOTOS_COUNT = 10;
const FILTER_DELAY = 500;
const filters = document.querySelector('.img-filters');
const ACTIVE_CLASS = 'img-filters__button--active';

const getRandomPhotos = (photos) => {
  const shuffledPhotos = [...photos];

  for (let index = shuffledPhotos.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledPhotos[index], shuffledPhotos[randomIndex]] =
      [shuffledPhotos[randomIndex], shuffledPhotos[index]];
  }

  return shuffledPhotos.slice(0, RANDOM_PHOTOS_COUNT);
};

const getFilteredPhotos = (photos, filterId) => {
  switch (filterId) {
    case 'filter-random':
      return getRandomPhotos(photos);

    case 'filter-discussed':
      return [...photos].sort(
        (firstPhoto, secondPhoto) =>
          secondPhoto.comments.length - firstPhoto.comments.length
      );

    default:
      return photos;
  }
};

const debounce = (callback, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const initPhotoFilters = (photos) => {
  const renderFilteredPhotos = debounce((filterId) => {
    clearMiniatures();
    renderMiniatures(getFilteredPhotos(photos, filterId));
  }, FILTER_DELAY);
  filters.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button || button.classList.contains(ACTIVE_CLASS)) {
      return;
    }

    filters.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
    button.classList.add(ACTIVE_CLASS);

    renderFilteredPhotos(button.id);
  });
};

export { initPhotoFilters };

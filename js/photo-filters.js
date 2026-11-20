import { renderMiniatures, clearMiniatures } from './rendering-miniature.js';

const RANDOM_PHOTOS_COUNT = 10;
const FILTER_DELAY = 500;
const filters = document.querySelector('.img-filters');
const activeClass = 'img-filters__button--active';

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

  let activeButton = filters.querySelector(`.${activeClass}`);

  filters.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button || button === activeButton) {
      return;
    }

    activeButton.classList.remove(activeClass);
    button.classList.add(activeClass);
    activeButton = button;

    renderFilteredPhotos(button.id);
  });
};

export { initPhotoFilters };

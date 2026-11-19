import { loadPhotos } from './api.js';
import { renderMiniatures } from './rendering-miniature.js';
import { initUploadForm } from './form.js';
import './scale.js';
import './effects.js';
import { initPhotoFilters } from './photo-filters.js';
import { initBigPicture } from './big-picture.js';

const DATA_ERROR_DURATION = 5000;

let photos = [];
initUploadForm();

loadPhotos()
  .then((loadedPhotos) => {
    photos = loadedPhotos;
    renderMiniatures(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    initPhotoFilters(photos);
    initBigPicture(() => photos);
  })

  .catch(() => {
    const errorTemplateElement = document.querySelector('#data-error');
    const errorMessageElement = errorTemplateElement.content.firstElementChild.cloneNode(true);

    document.body.append(errorMessageElement);

    setTimeout(() => {
      errorMessageElement.remove();
    }, DATA_ERROR_DURATION);
  });

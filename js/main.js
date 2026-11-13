import { loadPhotos } from './api.js';
import { renderMiniatures } from './rendering-miniature.js';
import { initUploadForm } from './form.js';
import './scale.js';
import './effects.js';
import { initBigPicture } from './big-picture.js';

let photos = [];
initUploadForm();

loadPhotos()
  .then((loadedPhotos) => {
    photos = loadedPhotos;
    renderMiniatures(photos);
    initBigPicture(() => photos);
  })

  .catch(() => {
    const errorTemplate = document.querySelector('#data-error');
    const errorMessage = errorTemplate.content.cloneNode(true);
    document.body.append(errorMessage);

    setTimeout(() => {
      document.querySelector('.data-error').remove();
    }, 5000);
  });

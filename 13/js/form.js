import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendPhoto } from './api.js';
import { validateForm, resetValidation } from './validation.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const previewImage = form.querySelector('.img-upload__preview img');
const effectPreviews = form.querySelectorAll('.effects__preview');
let previewObjectUrl = null;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
let isSending = false;
let activeMessage = null;

const setSendingState = (sending) => {
  isSending = sending;
  submitButton.disabled = sending;
};

const resetForm = () => {
  form.reset();
  uploadInput.value = '';
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
  previewImage.src = 'img/upload-default-image.jpg';
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
  resetScale();
  resetEffects();
  resetValidation();
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const removeMessage = () => {
  if (activeMessage) {
    activeMessage.remove();
    activeMessage = null;
    document.removeEventListener('keydown', onMessageKeydown);
    document.removeEventListener('click', onOutsideMessageClick);
  }
};

function onMessageKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeMessage();
  }
}

function onOutsideMessageClick(evt) {
  if (activeMessage && !evt.target.closest('.success__inner, .error__inner')) {
    removeMessage();
  }
}

const showMessage = (template) => {
  removeMessage();
  activeMessage = template.cloneNode(true).firstElementChild;
  document.body.appendChild(activeMessage);
  const button = activeMessage.querySelector('button');
  button.addEventListener('click', removeMessage, { once: true });
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onOutsideMessageClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isSending) {
    evt.preventDefault();
    closeForm();
  }
}

const openForm = () => {
  const file = uploadInput.files[0];
  if (!file) {
    return;
  }

  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
  }
  previewObjectUrl = URL.createObjectURL(file);
  const imageUrl = previewObjectUrl;
  previewImage.src = imageUrl;
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onSubmit = (evt) => {
  evt.preventDefault();

  if (!validateForm() || isSending) {
    return;
  }

  setSendingState(true);

  sendPhoto(new FormData(form))
    .then(() => {
      closeForm();
      showMessage(successTemplate);
    })
    .catch(() => {
      showMessage(errorTemplate);
    })
    .finally(() => {
      setSendingState(false);
    });
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', openForm);
  cancelButton.addEventListener('click', closeForm);
  hashtagInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
  descriptionInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
  form.addEventListener('submit', onSubmit);
  form.addEventListener('reset', () => {
    resetScale();
    resetEffects();
    resetValidation();
  });
};

export { initUploadForm, closeForm };

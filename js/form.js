import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendPhoto } from './api.js';
import { validateForm, resetValidation } from './validation.js';

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const uploadInputElement = document.querySelector('.img-upload__input');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewImageElement = formElement.querySelector('.img-upload__preview img');
const effectPreviewElements = formElement.querySelectorAll('.effects__preview');
let previewObjectUrl = null;
const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
let isSending = false;
let activeMessageElement = null;

const setSendingState = (sending) => {
  isSending = sending;
  submitButtonElement.disabled = sending;
};

const resetForm = () => {
  formElement.reset();
  uploadInputElement.value = '';
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
  previewImageElement.src = 'img/upload-default-image.jpg';
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
  resetScale();
  resetEffects();
  resetValidation();
};

const closeForm = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const removeMessage = () => {
  if (activeMessageElement) {
    activeMessageElement.remove();
    activeMessageElement = null;
    document.removeEventListener('keydown', onMessageKeydown, true);
    document.removeEventListener('click', onOutsideMessageClick);
  }
};

function onMessageKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    removeMessage();
  }
}

function onOutsideMessageClick(evt) {
  if (activeMessageElement && !evt.target.closest('.success__inner, .error__inner')) {
    removeMessage();
  }
}

const showMessage = (template) => {
  removeMessage();
  activeMessageElement = template.cloneNode(true).firstElementChild;
  document.body.appendChild(activeMessageElement);
  const messageButtonElement = activeMessageElement.querySelector('button');
  messageButtonElement.addEventListener('click', removeMessage, { once: true });
  document.addEventListener('keydown', onMessageKeydown, true);
  document.addEventListener('click', onOutsideMessageClick);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isSending) {
    evt.preventDefault();
    closeForm();
  }
}

const openForm = () => {
  const file = uploadInputElement.files[0];
  if (!file) {
    return;
  }

  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
  }
  previewObjectUrl = URL.createObjectURL(file);
  const imageUrl = previewObjectUrl;
  previewImageElement.src = imageUrl;
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
  overlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onSubmit = (evt) => {
  evt.preventDefault();

  if (!validateForm() || isSending) {
    return;
  }

  setSendingState(true);

  sendPhoto(new FormData(formElement))
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
  uploadInputElement.addEventListener('change', openForm);
  cancelButtonElement.addEventListener('click', closeForm);
  hashtagInputElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
  descriptionInputElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  });
  formElement.addEventListener('submit', onSubmit);
};

export { initUploadForm };

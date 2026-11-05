const overlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
};

uploadInput.addEventListener('change', openForm);
cancelButton.addEventListener('click', closeForm);

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeForm();
  }
};

const onHashtagKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onDescriptionKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

hashtagInput.addEventListener('keydown', onHashtagKeydown);
descriptionInput.addEventListener('keydown', onDescriptionKeydown);
document.addEventListener('keydown', onDocumentKeydown);

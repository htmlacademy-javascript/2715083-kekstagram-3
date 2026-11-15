const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtags = (value) => {
  const hashtags = parseHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT &&
    hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag)) &&
    new Set(hashtags).size === hashtags.length;
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, validateHashtags, 'Проверьте хэштеги: не более 5, без повторов; каждый должен начинаться с # и содержать до 19 букв или цифр', 3);
pristine.addValidator(descriptionInput, validateDescription, `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`);

const validateForm = () => pristine.validate();
const resetValidation = () => pristine.reset();

form.addEventListener('submit', (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
});

export { validateForm, resetValidation };

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

const validateHashtagFormat = (value) =>
  parseHashtags(value).every((hashtag) => HASHTAG_REGEX.test(hashtag));

const validateHashtagCount = (value) =>
  parseHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagUniqueness = (value) => {
  const hashtags = parseHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(hashtagInput, validateHashtagFormat, 'Неправильный хэштег');
pristine.addValidator(hashtagInput, validateHashtagCount, 'Нельзя указать больше пяти хэштегов');
pristine.addValidator(hashtagInput, validateHashtagUniqueness, 'Хэштеги не должны повторяться');
pristine.addValidator(descriptionInput, validateDescription, `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`);

const validateForm = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validateForm, resetValidation };

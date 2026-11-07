const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const parseHashtags = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtags = (value) => {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return true;
  }

  const hashtags = parseHashtags(trimmedValue);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }

  for (const hashtag of hashtags) {
    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }
  }

  const uniqueHashtags = new Set(hashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return true;
};

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Неправильный хэштег'
);

pristine.addValidator(
  descriptionInput,
  validateDescription,
  `Длина комментария не может превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

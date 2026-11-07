const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const previewImage = document.querySelector('.img-upload__preview img');

const EFFECTS = {
  none: {
    filter: '',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const applyEffect = (value, effectName) => {
  const effect = EFFECTS[effectName];
  if (effect.filter === '') {
    previewImage.style.filter = '';
  } else {
    previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
  effectLevelValue.value = value;
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSlider = (effectName) => {
  const effect = EFFECTS[effectName];
  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    return;
  }
  effectLevelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
};

effectLevelSlider.noUiSlider.on('update', (values) => {
  const value = parseFloat(values[0]);
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(value, currentEffect);
});

effectsList.addEventListener('change', (evt) => {
  const effectName = evt.target.value;
  updateSlider(effectName);
});

const resetEffects = () => {
  const noneRadio = document.querySelector('.effects__radio[value="none"]');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  effectLevelContainer.classList.add('hidden');
  previewImage.style.filter = '';
  effectLevelValue.value = '';
};

export { resetEffects };

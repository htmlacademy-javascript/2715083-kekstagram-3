const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const previewImageElement = document.querySelector('.img-upload__preview img');

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
    previewImageElement.style.filter = '';
  } else {
    previewImageElement.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
  effectLevelValueElement.value = value;
};

noUiSlider.create(effectLevelSliderElement, {
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
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: EFFECTS.none.min,
        max: EFFECTS.none.max,
      },
      start: EFFECTS.none.max,
      step: EFFECTS.none.step,
    });
    effectLevelContainerElement.classList.add('hidden');
    return;
  }
  effectLevelContainerElement.classList.remove('hidden');
  effectLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
};

effectLevelSliderElement.noUiSlider.on('update', (values) => {
  const value = parseFloat(values[0]);
  const currentEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(value, currentEffect);
});

effectsListElement.addEventListener('change', (evt) => {
  if (!evt.target.matches('.effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  updateSlider(effectName);

  if (effectName === 'none') {
    applyEffect(100, effectName);
    return;
  }

  effectLevelSliderElement.noUiSlider.set(EFFECTS[effectName].max);
});

const resetEffects = () => {
  const noneRadioElement = document.querySelector('.effects__radio[value="none"]');
  noneRadioElement.checked = true;

  updateSlider('none');
  applyEffect(EFFECTS.none.max, 'none');
};

export { resetEffects };

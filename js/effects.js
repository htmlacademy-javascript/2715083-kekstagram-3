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

const effectsListElement = document.querySelector('.effects__list');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const previewImageElement = document.querySelector('.img-upload__preview img');
const noneRadioElement = effectsListElement.querySelector('.effects__radio[value="none"]');

let currentEffect = 'none';

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
    min: EFFECTS.none.min,
    max: EFFECTS.none.max,
  },
  start: EFFECTS.none.max,
  step: EFFECTS.none.step,
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
  applyEffect(value, currentEffect);
});

effectsListElement.addEventListener('change', (evt) => {
  if (!evt.target.matches('.effects__radio')) {
    return;
  }

  currentEffect = evt.target.value;
  updateSlider(currentEffect);

  if (currentEffect === 'none') {
    applyEffect(EFFECTS.none.max, currentEffect);
    return;
  }

  effectLevelSliderElement.noUiSlider.set(EFFECTS[currentEffect].max);
});

const resetEffects = () => {
  currentEffect = 'none';
  noneRadioElement.checked = true;

  updateSlider(currentEffect);
  applyEffect(EFFECTS.none.max, currentEffect);
};

export { resetEffects };

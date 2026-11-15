const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

let currentScale = SCALE_MAX;

scaleControlValue.value = `${currentScale}%`;
previewImage.style.transform = `scale(${currentScale / 100})`;

const updateScaleView = () => {
  scaleControlValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
};

const decreaseScale = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScaleView();
  }
};

const increaseScale = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScaleView();
  }
};

scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);

const resetScale = () => {
  currentScale = SCALE_MAX;
  updateScaleView();
};

export { resetScale };

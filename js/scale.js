const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

let currentScale = SCALE_MAX;

scaleControlValueElement.value = `${currentScale}%`;
previewImageElement.style.transform = `scale(${currentScale / 100})`;

const updateScaleView = () => {
  scaleControlValueElement.value = `${currentScale}%`;
  previewImageElement.style.transform = `scale(${currentScale / 100})`;
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

scaleControlSmallerElement.addEventListener('click', decreaseScale);
scaleControlBiggerElement.addEventListener('click', increaseScale);

const resetScale = () => {
  currentScale = SCALE_MAX;
  updateScaleView();
};

export { resetScale };

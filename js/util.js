const TIMEOUT_DELAY = 500;

function getRandomNumber (min, max) {
  if (min < 0  || max < 0) {
    return 'ERROR! Значения \'min\' и \'max\' должны быть больше нуля!';
  }

  if (min >= max) {
    return 'ERROR! Значение \'max\' должно быть строго больше значения \'max\'!';
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function checkLength (str, maxLength) {
  return str.length <= maxLength;
}

const shuffleArray = (arr) => arr.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {getRandomNumber, getRandomArrayElement, checkLength, isEscapeKey, debounce, throttle, shuffleArray};

const TIMEOUT_DELAY = 500;

function checkLength (str, maxLength) {
  return str.length <= maxLength;
}

const shuffleArray = (arr) => arr.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {checkLength, isEscapeKey, debounce, shuffleArray};

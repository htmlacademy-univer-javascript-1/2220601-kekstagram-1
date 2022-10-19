/* Функция, возвращающая рандомное число из заданного диапазона */
function getRandomNumber (min, max) {
  if (min < 0  || max < 0) {
    return 'ERROR! Значения \'min\' и \'max\' должны быть больше нуля!';
  }

  if (min >= max) {
    return 'ERROR! Значение \'max\' должно быть строго больше значения \'max\'!';
  }
  return Math.floor(Math.random() * (max - min) + min);
}

/* Функция для определения максимальной длины строки */
function checkLength (str, maxLength) {
  return str.length > maxLength;
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

checkLength('asd', 3);

export {getRandomNumber, getRandomArrayElement, checkLength};

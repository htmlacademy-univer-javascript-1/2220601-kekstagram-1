/* eslint-disable no-console */

/* Функция, возвращающая рандомное число из заданного диапазона */
function getRandomInRange (min, max) {
  if (min < 0  || max < 0) {
    return 'ERROR! Значения \'min\' и \'max\' должны быть больше нуля!';
  }

  if (min >= max) {
    return 'ERROR! Значение \'max\' должно быть строго больше значения \'max\'!';
  }
  return Math.floor(Math.random() * (max - min) + min);
}

console.log(getRandomInRange(125,228));


/* Функция для определения максимальной длины строки */
function checkLength (str, maxLength) {
  if (str.length > maxLength) {
    return false;
  }
  return true;
}

console.log(checkLength('ку прив го встр', 35));

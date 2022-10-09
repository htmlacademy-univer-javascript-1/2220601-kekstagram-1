const NAMES = [
  'Семен',
  'Владимир',
  'Адис',
  'Андрей',
  'Роман',
  'Даниил',
  'Тимофей',
  'Акакий',
  'Аркадий'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Крутой',
  'Вауууу',
  'Тут могла быть ваша реклама...',
  'Мне лень придумывать описания',
  'Ну типа...',
  'Бравл старс',
  'Бешикташ',
  'Дота 2',
  'Мидовый пудж - топ',
  'УрФУ - норм уник'
];

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

let idComment = 0;
const createComment = () => ({
  id: idComment++,
  avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

let idPublication = 0;
const createPublication = () => ({
  id: idPublication++,
  url: `photos/${this.id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comment: Array.from({length: 5}, createComment)
});

checkLength(228, 1337);
const arrayPhotos = Array.from({length: 25 }, createPublication);
console.log(arrayPhotos);

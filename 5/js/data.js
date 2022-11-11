import {getRandomNumber, getRandomArrayElement} from './util.js';

const COMMENTS_COUNT = 5;
const PHOTOS_COUNT = 25;

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

let idComment = 0;
const createComment = () => ({
  id: idComment++,
  avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

let idPublication = 0;
const createPublication = () => ({
  id: ++idPublication,
  url: `photos/${idPublication}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comment: Array.from({length: COMMENTS_COUNT}, createComment)
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPublication);


export {createPhotos};

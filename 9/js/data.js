import {getRandomNumber, getRandomArrayElement} from './util.js';

const COMMENTS_COUNT = 25;
const PHOTOS_COUNT = 25;
const HASHTAGS_COUNT = 5;
const COMMENTS_LENGTH = 140;
const REG_EXP = /^#[A-Za-z0-9А-Яа-яЁё]{1,19}$/;
const HASTAGS_LENGTH = 20;
const UPLOAD_COMMENTS_COUNT = 5;
const DEFAULT_COMMENTS_COUNT = 5;

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
  'Тупые козырьки',
  'Бравл старс',
  'Бешикташ',
  'Дота 2',
  'Момчик на пудже',
  'урфу норм уник ))0'
];

let idComment = 0;
const createComment = () => ({
  id: idComment++,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

let idPublication = 0;
const createPublication = () => ({
  id: ++idPublication,
  url: `photos/${idPublication}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, COMMENTS_COUNT)}, createComment)
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, createPublication);


export {createPhotos, HASHTAGS_COUNT, COMMENTS_LENGTH, REG_EXP, HASTAGS_LENGTH, COMMENTS_COUNT, DEFAULT_COMMENTS_COUNT, UPLOAD_COMMENTS_COUNT};

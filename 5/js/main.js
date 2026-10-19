const DESCRIPTIONS = [
  'Мой прекрасный день',
  'Закат на море',
  'Прогулка в парке',
  'Вкусный завтрак',
  'Рабочие будни',
  'Встреча с друзьями',
  'Путешествие в горы',
  'Уютный вечер дома',
  'Семейное фото',
  'Городские пейзажи',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'Мария', 'Иван', 'Елена', 'Дмитрий',
  'Анна', 'Сергей', 'Ольга', 'Алексей', 'Наталья',
  'Павел', 'Юлия', 'Максим', 'Татьяна', 'Андрей'
];

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(0, array.length - 1)];
}

let commentIdCounter = 1;

function createComment() {
  const sentence = getRandomArrayElement(MESSAGES);
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: sentence,
    name: getRandomArrayElement(NAMES)
  };
}

function createComments() {
  const commentsCount = getRandomInteger(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }
  return comments;
}

function createPhoto(index) {
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
}
// eslint-disable-next-line no-unused-vars
const PHOTOS = Array.from({ length: 25 }, (_, index) => createPhoto(index + 1));

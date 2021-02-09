'use strict';

const OFFERS_COUNT = 10;
const AVATAR_COUNT = 8;

const Price = {
  MIN: 100,
  MAX: 10000,
};

const Room = {
  MIN: 1,
  MAX: 6,
};

const Guest = {
  MIN: 1,
  MAX: 10,
};

let offers = [];

const types = ['palace', 'flat', 'house', 'bungalow'];

const checkins = ['12:00', '13:00', '14:00'];

const checkouts = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomNumber = (min, max, digit = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min]
  }

  return digit === 0 ? Math.floor(Math.random() * (max - min + 1)) + min : ((Math.random() * (max - min + min)) + min).toFixed(digit);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const addOffers = () => {
  for (let i = 0; i < OFFERS_COUNT; i++) {
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, AVATAR_COUNT) + '.png',
      },
      offer: {
        title: 'Случайный заголовок',
        address: getRandomNumber(1, 600) + ', ' + getRandomNumber(1, 600),
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomArrayElement(types),
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: getRandomArrayElement(checkins),
        checkout: getRandomArrayElement(checkouts),
        features: shuffleArray(features).slice(0, getRandomNumber(1, features.length)),
        description: 'Случайное описание',
        photos: getRandomArrayElement(photos),
      },
      location: {
        x: getRandomNumber(35.65000, 35.70000, 5),
        y: getRandomNumber(139.70000, 139.80000, 5),
      },
    })
  }
};

addOffers();

//console.log(offers);

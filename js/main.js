'use strict';

const OFFERS_COUNT = 10;
const AVATAR_COUNT = 8;
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const ADDRESS_MAX = 100;

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

const LocationX = {
  MIN: 35.65000,
  MAX: 35.70000,
}

const LocationY = {
  MIN: 139.70000,
  MAX: 139.80000,
}

let offers = [];

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
        address: getRandomNumber(1, ADDRESS_MAX) + ', ' + getRandomNumber(1, ADDRESS_MAX),
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: getRandomArrayElement(CHECKINS),
        checkout: getRandomArrayElement(CHECKOUTS),
        features: shuffleArray(FEATURES).slice(0, getRandomNumber(1, FEATURES.length)),
        description: 'Случайное описание',
        photos: getRandomArrayElement(PHOTOS),
      },
      location: {
        x: getRandomNumber(LocationX.MIN, LocationX.MAX, 5),
        y: getRandomNumber(LocationY.MIN, LocationY.MAX, 5),
      },
    })
  }
};

addOffers();

//console.log(offers);

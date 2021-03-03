import { offers, TYPES } from './data.js';
import { numDecline } from './util.js';

const mapBox = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content;
const popupTemplate = cardTemplate.querySelector('.popup');

const renderFeatures = (features, container) => {
  let list = container.querySelectorAll('li');

  if (list) {
    list.forEach((option) => {
      if (features.indexOf(option.classList[1].replace('popup__feature--', '')) === -1) {
        option.remove();
      }
    });
  }
};

const renderPhotos = (photoArray, container) => {
  container.innerHTML = '';
  for (let i = 0; i < photoArray.length; i++) {
    let picture = document.createElement('img');
    picture.classList.add('popup__photo');
    picture.src = photoArray[i];
    picture.width = '45';
    picture.height = '40';
    picture.alt = 'Фотография жилья';
    container.appendChild(picture);
  }
};


const makeElements = (item) => {
  const popupElement = popupTemplate.cloneNode(true);

  const popupTitle = popupElement.querySelector('.popup__title');
  if (item.offer.title) {
    popupTitle.textContent = item.offer.title;
  } else {
    popupTitle.remove();
  }

  const popupAddress = popupElement.querySelector('.popup__text--address');
  if (item.offer.address) {
    popupAddress.textContent = item.offer.address;
  } else {
    popupAddress.remove();
  }

  const popupPrice = popupElement.querySelector('.popup__text--price');
  if (item.offer.price) {
    popupPrice.textContent = `${item.offer.price} ₽/ночь`;
  } else {
    popupPrice.remove();
  }

  const popupType = popupElement.querySelector('.popup__type');
  if (TYPES[item.offer.type]) {
    popupType.textContent = TYPES[item.offer.type];
  } else {
    popupType.remove();
  }

  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  if (item.offer.rooms && item.offer.guests) {
    popupCapacity.textContent = `${item.offer.rooms} ${numDecline(item.offer.rooms, 'комната', 'комнаты', 'комнат')} для ${item.offer.guests} ${numDecline(item.offer.guests, 'гостя', 'гостей', 'гостей')}`;
  } else {
    popupCapacity.remove();
  }

  const popupTime = popupElement.querySelector('.popup__text--time');
  if (item.offer.checkin && item.offer.checkout) {
    popupTime.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  } else {
    popupTime.remove();
  }

  const popupFeatures = popupElement.querySelector('.popup__features');
  if (item.offer.features) {
    renderFeatures(item.offer.features, popupFeatures);
  } else {
    popupFeatures.remove();
  }

  const popupDescription = popupElement.querySelector('.popup__description');
  if (item.offer.description) {
    popupDescription.textContent = item.offer.description;
  } else {
    popupDescription.remove();
  }

  const photoContainer = popupElement.querySelector('.popup__photos');
  if (item.offer.photos) {
    renderPhotos(item.offer.photos, photoContainer);
  } else {
    photoContainer.remove();
  }

  const popupAvatar = popupElement.querySelector('.popup__avatar');
  if (item.author.avatar) {
    popupAvatar.src = item.author.avatar;
  } else {
    popupAvatar.remove();
  }

  mapBox.appendChild(popupElement);
};

export {makeElements};

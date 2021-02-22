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
  popupTitle.textContent = item.offer.title;

  const popupAddress = popupElement.querySelector('.popup__text--address');
  popupAddress.textContent = item.offer.address;

  const popupPrice = popupElement.querySelector('.popup__text--price');
  popupPrice.textContent = `${item.offer.price} ₽/ночь`;

  const popupType = popupElement.querySelector('.popup__type');
  popupType.textContent = TYPES[item.offer.type];

  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${item.offer.rooms} ${numDecline(item.offer.rooms, 'комната', 'комнаты', 'комнат')} для ${item.offer.guests} ${numDecline(item.offer.guests, 'гостя', 'гостей', 'гостей')}`;

  const popupTime = popupElement.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;

  const popupFeatures = popupElement.querySelector('.popup__features');
  renderFeatures(item.offer.features, popupFeatures);

  const popupDescription = popupElement.querySelector('.popup__description');
  popupDescription.textContent = item.offer.description;

  const photoContainer = popupElement.querySelector('.popup__photos');
  renderPhotos(item.offer.photos, photoContainer);

  const popupAvatar = popupElement.querySelector('.popup__avatar');
  popupAvatar.src = item.author.avatar;

  mapBox.appendChild(popupElement);
};

makeElements(offers[0]);

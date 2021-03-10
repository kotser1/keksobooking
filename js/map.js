/* global L:readonly */
import {makeElements} from './make-elements.js';
import {DIGITS_AFTER_COMMA} from './data.js';

const MAP_LAT = 35.68034;
const MAP_LNG = 139.76722;
const MAP_ZOOM = 9;
const PIN_SIZE = [50, 50];
const PIN_ANCHOR = [25, 50];
const MAIN_PIN_URL = './img/main-pin.svg';
const OFFER_PIN_URL = './img/pin.svg';

const address = document.querySelector('#address');
const disabledFields = document.querySelectorAll('select.map__filter, fieldset');

//До загрузки карты форма не активна. Для элементов формы устанавливаем атрибут disabled
const setDisabledStatus = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const toggleFormStatus = () => {
  document.querySelector('.ad-form').classList.toggle('ad-form--disabled');
  document.querySelector('.map__filters').classList.toggle('map__filters--disabled');
  setDisabledStatus();
};

toggleFormStatus();

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormStatus();
  })
  .setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, MAP_ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_URL,
  iconSize: PIN_SIZE,
  iconAnchor: PIN_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: MAP_LAT,
    lng: MAP_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

//Устанавливаем значение по умолчанию для поля 'Адрес'
address.value = MAP_LAT + ', ' + MAP_LNG;

//Передаем текущие координаты маркера в поле 'Адрес'
mainPinMarker.on('moveend', (evt) => {
  address.value = evt.target.getLatLng().lat.toFixed(DIGITS_AFTER_COMMA)  + ', ' + evt.target.getLatLng().lng.toFixed(DIGITS_AFTER_COMMA);
});

const renderElements = (similarOffers) => {

  similarOffers.forEach((item) => {
    const offerPinIcon = L.icon({
      iconUrl: OFFER_PIN_URL,
      iconSize: PIN_SIZE,
      iconAnchor: PIN_ANCHOR,
    });

    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon: offerPinIcon,
      },
    );

    marker.addTo(map).bindPopup(makeElements(item));
  });
};

export {renderElements};

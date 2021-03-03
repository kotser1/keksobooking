/* global L:readonly */
import {makeElements} from './make-elements.js';
import {offers} from './data.js';

const MAP_LAT = 35.68034;
const MAP_LNG = 139.76722;
const MAP_ZOOM = 13;

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
  iconUrl: '../img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68034,
    lng: 139.76722,
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
  address.value = evt.target.getLatLng().lat.toFixed(5)  + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

offers.forEach((item) => {
  const offerPinIcon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  const marker = L.marker(
    {
      lat: item.location.x,
      lng: item.location.y,
    },
    {
      icon: offerPinIcon,
    },
  );

  marker.addTo(map).bindPopup(makeElements(item));
});

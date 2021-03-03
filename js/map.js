/* global L:readonly */

const MAP_LAT = 35.68034;
const MAP_LNG = 139.76722;
const MAP_ZOOM = 13;

const disabledFields = document.querySelectorAll('select.map__filter, fieldset');

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

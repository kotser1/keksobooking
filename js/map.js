/* global L:readonly */
/* global _:readonly */
import {makeElements} from './make-elements.js';
import {getData} from './api.js';
import {MAX_OFFERS, filterData} from './filter.js';

const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_LAT = 35.68034;
const MAP_LNG = 139.76722;
const MAP_ZOOM = 9;
const PIN_SIZES = [50, 50];
const PIN_ANCHOR_SIZES = [25, 50];
const MAIN_PIN_URL = './img/main-pin.svg';
const OFFER_PIN_URL = './img/pin.svg';
const DIGITS_AFTER_COMMA = 5;
const RERENDER_DELAY = 500;
const ALERT_SHOW_TIME = 5000;

const address = document.querySelector('#address');
const disabledFields = document.querySelectorAll('select.map__filter, fieldset');
const mapFilters = document.querySelector('.map__filters');


const setDisabledStatus = () => {
  disabledFields.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

const toggleFormStatus = () => {
  document.querySelector('.ad-form').classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  setDisabledStatus();
};

toggleFormStatus();

const map = L.map('map-canvas')
  .setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, MAP_ZOOM);

L.tileLayer(TILE_LAYER_URL, {
  attribution: MAP_COPYRIGHT,
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_URL,
  iconSize: PIN_SIZES,
  iconAnchor: PIN_ANCHOR_SIZES,
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

const setDefaultAdress = () => {
  address.value = MAP_LAT + ', ' + MAP_LNG;
};

setDefaultAdress();

mainPinMarker.on('moveend', (evt) => {
  address.value = evt.target.getLatLng().lat.toFixed(DIGITS_AFTER_COMMA)  + ', ' + evt.target.getLatLng().lng.toFixed(DIGITS_AFTER_COMMA);
});


const layerGroup = L.layerGroup().addTo(map);

const removeElements = () => {
  layerGroup.clearLayers();
}

const renderElements = (similarOffers) => {
  similarOffers.forEach((item) => {
    const offerPinIcon = L.icon({
      iconUrl: OFFER_PIN_URL,
      iconSize: PIN_SIZES,
      iconAnchor: PIN_ANCHOR_SIZES,
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

    marker.addTo(layerGroup).bindPopup(makeElements(item));
  });
};

const resetMainPinMarker = () => {
  mainPinMarker.setLatLng(L.latLng(MAP_LAT, MAP_LNG));
};

let adverts = [];

const onMapFiltersChange = _.debounce(() => {
  removeElements();
  renderElements(filterData(adverts));
}, RERENDER_DELAY);

const onSuccess = (data) => {
  adverts = data.slice();
  renderElements(adverts.slice(0, MAX_OFFERS));
  toggleFormStatus();
  mapFilters.addEventListener('change', onMapFiltersChange);
}

const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Не удалось загрузить список объектов. Попробуйте ещё раз';
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

getData(onSuccess, showAlert);


export {renderElements, setDefaultAdress, resetMainPinMarker, removeElements, onMapFiltersChange, mapFilters};

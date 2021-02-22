const offerForm = document.querySelector('.ad-form');
const checkinTime = offerForm.querySelector('#timein');
const checkoutTime = offerForm.querySelector('#timeout');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');

const DEFAULT_MIN_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

offerType.addEventListener('change', function () {
  offerPrice.placeholder = DEFAULT_MIN_PRICE[offerType.value];
  offerPrice.min = DEFAULT_MIN_PRICE[offerType.value];
});

checkinTime.addEventListener('change', function () {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', function () {
  checkinTime.value = checkoutTime.value;
});

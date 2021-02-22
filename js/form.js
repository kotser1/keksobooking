const offerForm = document.querySelector('.ad-form');

const checkinTime = offerForm.querySelector('#timein');
const checkoutTime = offerForm.querySelector('#timeout');

checkinTime.addEventListener('change', function () {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', function () {
  checkinTime.value = checkoutTime.value;
});

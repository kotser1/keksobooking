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

const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const selectCapacity = offerForm.querySelector('#capacity');
const capacityOptions = selectCapacity.querySelectorAll('option');
const selectRooms = offerForm.querySelector('#room_number');

const validateRooms = () => {
  const roomValue = selectRooms.value;

  capacityOptions.forEach((option) => {
    // Что проверяет это условие:
    // Мы проверяем наличие option.value (кол-во гостей) в значении свойства объекта numberOfGuests. Значения у этого объекта являются массивами.
    // Используя метод indexOf мы получаем индекс элемента массива (проверяем наличие элемента в массиве).
    // Если элемент есть в массиве, то индекс будет >=0 . А если indexOf возвращает -1 , то это значит что элемента в массиве нет и ему ставим атрибут disabled.
    let isDisabled = (numberOfGuests[roomValue].indexOf(option.value) === -1);

    option.selected = numberOfGuests[roomValue][0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
};

const onRoomNumberChange = () => {
  validateRooms();
};

validateRooms();
selectRooms.addEventListener('change', onRoomNumberChange);


// addValidation();

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

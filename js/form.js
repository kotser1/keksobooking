import { numDecline } from './util.js';

const offerForm = document.querySelector('.ad-form');
const checkinTime = offerForm.querySelector('#timein');
const checkoutTime = offerForm.querySelector('#timeout');
const offerType = offerForm.querySelector('#type');
const offerPrice = offerForm.querySelector('#price');
const capacitySelect = offerForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const selectRooms = offerForm.querySelector('#room_number');
const offerTitleInput = offerForm.querySelector('#title');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const DEFAULT_MAX_PRICE = 1000000;

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

// Синхронизация полей времени заезда и выезда
checkinTime.addEventListener('change', () => {
  checkoutTime.value = checkinTime.value;
});

checkoutTime.addEventListener('change', () => {
  checkinTime.value = checkoutTime.value;
});


// Валидация цены
offerType.addEventListener('change', () => {
  offerPrice.placeholder = DEFAULT_MIN_PRICE[offerType.value];
  offerPrice.min = DEFAULT_MIN_PRICE[offerType.value];
});

offerPrice.addEventListener('input', () => {
  if (offerPrice.value > DEFAULT_MAX_PRICE) {
    offerPrice.setCustomValidity('Цена не должна превышать ' + DEFAULT_MAX_PRICE + ' руб.');
  } else if (offerPrice.value < DEFAULT_MIN_PRICE[offerType.value]) {
    offerPrice.setCustomValidity('Цена должна быть не менее ' + DEFAULT_MIN_PRICE[offerType.value] + ' руб.');
  } else {
    offerPrice.setCustomValidity('');
  }

  offerPrice.reportValidity();
});


//Валидация заголовка
offerTitleInput.addEventListener('input', () => {
  const valueLength = offerTitleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' ' + numDecline((MIN_TITLE_LENGTH - valueLength), 'символ', 'символа', 'символов'));
  } else if (valueLength > MAX_TITLE_LENGTH) {
    offerTitleInput.setCustomValidity('Заголовок не должен превышать' + MAX_TITLE_LENGTH + ' ' + numDecline(MAX_TITLE_LENGTH, 'символ', 'символа', 'символов'));
  } else {
    offerTitleInput.setCustomValidity('');
  }

  offerTitleInput.reportValidity();
});


// Валидация количества гостей и комнат

const validateRooms = () => {
  const roomValue = selectRooms.value;
  capacityOptions.forEach((option) => {

    // Что проверяет это условие:
    // Проверяем наличие option.value (кол-во гостей) в значении свойства объекта numberOfGuests. Значения у этого объекта являются массивами.
    // Используя метод indexOf мы получаем индекс элемента массива (проверяем наличие элемента в массиве).
    // Если indexOf возвращает -1 , то это значит, что элемента в массиве нет и для соответствующего <option> ставим атрибут disabled="true". Если элемент есть в массиве, то индекс будет >=0, и соответственно disabled="false".
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

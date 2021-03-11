const ALERT_SHOW_TIME = 5000;
const main = document.querySelector('main');

const getRandomNumber = (min, max, digit = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min]
  }

  return digit === 0 ? Math.floor(Math.random() * (max - min + 1)) + min : (Math.random() * (max - min) + min).toFixed(digit);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if(num > 10 && (Math.round((num % 100) / 10)) == 1) {
    return genitivePlural;
  } else {
    switch(num % 10) {
      case 1: return nominative;
      case 2:
      case 3:
      case 4: return genitiveSingular;
    }
    return genitivePlural;
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content;
  const successMessage = successMessageTemplate.querySelector('.success');
  main.appendChild(successMessage);

  setTimeout(() => {
    successMessage.remove();
  }, ALERT_SHOW_TIME);
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content;
  const errorMessage = errorMessageTemplate.querySelector('.error');
  main.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getRandomArrayElement, shuffleArray, numDecline, showAlert, showSuccessMessage, showErrorMessage};

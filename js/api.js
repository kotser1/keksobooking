import {renderElements} from './map.js';
import {showAlert} from './util.js';

fetch('https://22.javascript.pages.academy/keksobooking/data222')
  .then((response) => response.json())
  .then((homes) => {
    renderElements(homes);
  })
  .catch(() => {
    showAlert('Не удалось загрузить список объектов. Попробуйте ещё раз');
  });

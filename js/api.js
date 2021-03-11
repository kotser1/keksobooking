import {showAlert} from './util.js';


//setUserFormSubmit(showAlert('OK'));

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((homes) => {
      onSuccess(homes);      // renderElements(homes);
    })
    .catch(() => {
      showAlert('Не удалось загрузить список объектов. Попробуйте ещё раз');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте еще раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз');
    });
};

export {getData, sendData};

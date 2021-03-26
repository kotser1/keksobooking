const ERROR_MESSAGE = 'Не удалось отправить форму. Попробуйте еще раз';

const Urls = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess, onFail) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((homes) => {
      onSuccess(homes);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail(ERROR_MESSAGE);
      }
    })
    .catch(() => {
      onFail(ERROR_MESSAGE);
    });
};

export {getData, sendData};

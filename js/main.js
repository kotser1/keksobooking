const getRandomNumber = (min, max, digit = 0) => {
  if (min < 0 || max < 0 ) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min]
  }

  return digit === 0 ? Math.floor(Math.random() * (max - min + 1)) + min : ((Math.random() * (max - min + min)) + min).toFixed(digit);
};

getRandomNumber(1, 10); // Получаем целое число

// getRandomNumber(0.1, 5, 4); // Получаем число с 4 знаками после запятой

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

photoFileChooser.addEventListener('change', () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = `<img src="${reader.result}" alt="Фото жилья" width="70" height="70">`
      photoPreview.innerHTML = result;
    });

    reader.readAsDataURL(file);
  }
});


const resetPhotos = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.innerHTML = '';
}

export { resetPhotos };

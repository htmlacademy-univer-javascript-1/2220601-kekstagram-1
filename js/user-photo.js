const FILE_TYPES = ['png', 'jpeg', 'jpg', 'gif'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const imgPreview = document.querySelector('.img-upload__preview img');

const uploadUserPhoto = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

export {uploadUserPhoto};

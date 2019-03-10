/* INPUT data-name attr */

export default {
  name: ['surname', 'name', 'patronymic'],
  sex: ['male', 'female'],
  birthday: ['birthday'],
  agreement: ['agreement'],
  email: ['email'],
  password: ['password', 'passwordConfirm'],
  errorsMessages: [
    'Это поле обязательное для заполнения',
    'Это поле должно содержать не менее 2 букв',
    'Это поле не может содержать цифры и символы',
    'Это поле задается в формате мм/дд/гг',
    'Это поле должно содержать email адрес',
    'Это поле должно содержать только буквы и цифры',
    'Это поле должно содержать не менее 6 символов'],
};

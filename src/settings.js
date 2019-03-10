/* INPUT data-name attr */

export default {
  name: ['surname', 'name', 'patronymic'],
  sex: ['male', 'female'],
  birthday: ['birthday'],
  agreement: ['agreement'],
  phone: ['phone'],
  email: ['email'],
  password: ['password', 'passwordConfirm'],
  code: ['code'],
  errorsMessages: [
    'Это поле обязательное для заполнения',
    'Это поле должно содержать не менее 2 букв',
    'Это поле не может содержать цифры и символы',
    'Это поле задается в формате мм/дд/гг',
    'Это поле должно содержать email адрес',
    'Это поле должно содержать только буквы и цифры',
    'Это поле должно содержать не менее 6 символов',
    'Пароли не совпадают',
    'Это поле задается в формате +375 ** *******',
    'Код не совпадает'],
};

import template from './index.tpl';
import './index.scss';

import SETTINGS from '../../settings';


const reg = /[^A-zА-яЁё-\s]/;
const emailValid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const passValid = /[^A-zА-яЁё0-9]/;
const pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{2})$/;

const {
  name, birthday, email, password, errorsMessages,
} = SETTINGS;

const clearErrorText = (errorFields) => {
  [].map.call(errorFields, el => el.remove());
};

const addErrorText = (element, dataName, textError) => {
  element.insertAdjacentHTML('afterend', template(dataName, textError));
};

const clearErrorBorder = (element) => {
  element.classList.remove('error-value');
};

const addErrorBorder = (element) => {
  element.classList.add('error-value');
};


export default (element, dataName) => {
  const { value } = element;
  const [
    errorMessageOnEmpty,
    errorMessageOnLength,
    errorMessageOnSymbols,
    errorMessageOnDate,
    errorMessageOnEmail,
    errorMessageOnPassword,
    errorMessageOnPasswordLenght,
  ] = errorsMessages;
  const errorFields = document.querySelectorAll(`[data-name=${dataName}-error]`);
  let textError;

  /* <-- Errors messages --> */
  switch (value.length) {
    case 0:
      textError = errorMessageOnEmpty;
      break;
    case 1:
      textError = errorMessageOnLength;
      break;
    default:
      textError = errorMessageOnSymbols;
      break;
  }

  const clearError = () => {
    clearErrorBorder(element);
    if (errorFields) {
      clearErrorText(errorFields);
    }
  };

  const addError = () => {
    clearErrorText(errorFields);
    addErrorBorder(element);
  };

  /* <-- Name validation --> */
  if (name.includes(dataName)) {
    if (value.length > 1 && !reg.test(value)) {
      clearError();
    } else {
      addError();
      addErrorText(element, dataName, textError);
    }

  /* <-- Birthday validation --> */
  } else if (birthday.includes(dataName)) {
    if (value.length > 7 && pattern.test(value)) {
      clearError();
    } else {
      // eslint-disable-next-line no-param-reassign
      element.placeholder = 'Дата рождения';
      addError();
      addErrorText(element, dataName,
        value.length > 7 ? textError = errorMessageOnDate : textError = errorMessageOnEmpty);
    }

  /* <-- Email validation --> */
  } else if (email.includes(dataName)) {
    if (value.length > 1 && emailValid.test(value)) {
      clearError();
    } else {
      addError();
      addErrorText(element, dataName,
        value.length > 1 ? textError = errorMessageOnEmail : textError = errorMessageOnEmpty);
    }

  /* <-- Password validation --> */
  } else if (password.includes(dataName)) {
    if (value.length > 5 && !passValid.test(value)) {
      clearError();
    } else if (value.length === 0) {
      addError();
      addErrorText(element, dataName, textError = errorMessageOnEmpty);
    } else {
      addError();
      addErrorText(element, dataName,
        value.length > 5 ? textError = errorMessageOnPassword : textError = errorMessageOnPasswordLenght);
    }
  }
};

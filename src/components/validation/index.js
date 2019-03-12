import template from './index.tpl';
import './index.scss';

import SETTINGS from '../../settings';
import { getDataFromLocalStorage } from '../../utils';


const nameValid = /[^a-zA-Zа-яёА-ЯЁ -]/u;
const emailValid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
const phoneValid = /^\+375 [0-9]{2} [0-9]{7}$/;
const passValid = /[^A-zА-яЁё0-9]/;
const birthdayValid = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{2})$/;

const {
  name, birthday, phone, email, password, code, errorsMessages,
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
    errorMessageOnConcurrence,
    errorMessageOnPhoneNumber,
    errorMessageOnCode,
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

  const addError = (newElement = element) => {
    clearErrorText(errorFields);
    addErrorBorder(newElement);
  };

  /* <-- Name validation --> */
  if (name.includes(dataName)) {
    if (value.length > 1 && !nameValid.test(value)) {
      clearError();
    } else {
      addError();
      addErrorText(element, dataName, textError);
    }

  /* <-- Birthday validation --> */
  } else if (birthday.includes(dataName)) {
    if (value.length > 7 && birthdayValid.test(value)) {
      clearError();
    } else {
      // eslint-disable-next-line no-param-reassign
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

    const [passwordField, passwordConfirmField] = password;
    const passwordFields = document.querySelectorAll('.password > input');
    const passwordInput = [].find.call(passwordFields, el => el.dataset.name === passwordField);
    const passwordConfirmedInput = [].find.call(passwordFields, el => el.dataset.name === passwordConfirmField);
    const countOfElements = element.parentNode.children.length;
    if (!!passwordConfirmedInput.value.length
      && !!passwordInput.value.length
      && countOfElements === passwordFields.length) {
      if (passwordConfirmedInput.value !== passwordInput.value) {
        [].map.call(passwordFields, (el) => {
          addError(el);
          addErrorText(el, el.dataset.name, textError = errorMessageOnConcurrence);
        });
      }
    }

  /* <-- Phone validation --> */
  } else if (phone.includes(dataName)) {
    if (phoneValid.test(value)) {
      clearError();
    } else {
      // eslint-disable-next-line no-param-reassign
      addError();
      addErrorText(element, dataName,
        value.length > 0 ? textError = errorMessageOnPhoneNumber : textError = errorMessageOnEmpty);
    }

  /* <-- Code validation --> */
  } else if (code.includes(dataName)) {
    if (value === getDataFromLocalStorage().code) {
      clearError();
    } else {
      addError();
      addErrorText(element, dataName,
        value.length > 0 ? textError = errorMessageOnCode : textError = errorMessageOnEmpty);
    }
  }
};

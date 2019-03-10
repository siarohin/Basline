import template from './index.tpl';
import './index.scss';

import SETTINGS from '../../settings';


const reg = /[^A-zА-яЁё-\s]/;
const pattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3[0-1])\/([0-9]{2})$/;

const { name, birthday, errorsMessages } = SETTINGS;

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
  const [errorMessageOnEmpty, errorMessageOnLength, errorMessageOnSymbols, errorMessageOnDate] = errorsMessages;
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

  /* <-- Name validation --> */
  if (name.includes(dataName)) {
    if (value.length > 1 && !reg.test(value)) {
      clearErrorBorder(element);
      if (errorFields) {
        clearErrorText(errorFields);
      }
    } else {
      clearErrorText(errorFields);
      addErrorBorder(element);
      addErrorText(element, dataName, textError);
    }

  /* <-- Birthday validation --> */
  } else if (birthday.includes(dataName)) {
    if (value.length > 7 && pattern.test(value)) {
      clearErrorBorder(element);
      if (errorFields) {
        clearErrorText(errorFields);
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      element.placeholder = 'Дата рождения';
      clearErrorText(errorFields);
      addErrorBorder(element);
      addErrorText(element, dataName,
        value.length > 7 ? textError = errorMessageOnDate : textError = errorMessageOnEmpty);
    }
  }
};

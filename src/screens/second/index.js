import template from './index.tpl';
import './index.scss';

import SETTINGS from '../../settings';
// eslint-disable-next-line import/no-cycle
import ThirdScreen from '../third';
import isValidate from '../../components/validation';
import pseudoPlaceholder from '../../components/placeholder';


const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user-data'));

const saveDataToLocalStorage = (field, value) => {
  const userData = Object.assign({}, getDataFromLocalStorage(), { [field]: value });
  localStorage.setItem('user-data', JSON.stringify(userData));
};


export default class SecondScreen {
  static init() {
    this.draw();
    this.setActivePage();
    this.validationForm();
    this.loadUserData();
    this.onButtonClick();
  }


  static draw() {
    const body = document.querySelector('body');
    body.className = '';
    body.classList.add('color-scheme_second');
    const wrapper = document.querySelector('.content-area__wrapper');
    wrapper.innerHTML = template;
  }


  static setActivePage() {
    const navButton = document.querySelector('[data-name=scheme-second]');
    const activeButton = document.querySelector('.active-item');
    if (activeButton) {
      activeButton.classList.remove('active-item');
    }
    navButton.classList.add('active-item');
  }


  static validationForm() {
    const form = document.querySelector('.form-area');
    const { phone } = SETTINGS;

    form.addEventListener('focus', (e) => {
      const input = e.target;
      const dataName = input.dataset.name;

      pseudoPlaceholder(input);

      const addMaskTo = (event) => {
        event.preventDefault();
        if (event.code.includes('Digit') && (!event.shiftKey)) {
          input.value += event.key;
        }

        switch (input.value.length) {
          case 1:
            input.value = `+375 ${input.value}`;
            break;
          case 4:
            input.value += ' ';
            break;
          case 7:
            input.value += ' ';
            break;
          case 16:
            input.value = input.value.slice(0, -1);
            break;
          default:
            input.value = input.value;
            break;
        }
      };

      if (phone.includes(dataName)) {
        input.addEventListener('keypress', addMaskTo);
      }

      const onBlur = () => {
        if (dataName) {
          saveDataToLocalStorage(dataName, input.value);
        }
        isValidate(input, dataName);
        input.removeEventListener('keypress', addMaskTo);
        input.removeEventListener('blur', onBlur);
      };

      input.addEventListener('blur', onBlur);
    }, true);
  }


  static onButtonClick() {
    const button = document.querySelector('.form-area__button');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll('INPUT');

      const onFocusAll = () => {
        [].forEach.call(inputs, async (input) => {
          await input.focus();
          await input.blur();
        });
      };

      const isHasErrors = () => {
        const errors = document.querySelectorAll('.error-label');
        return errors.length;
      };

      const isCompleted = async () => {
        await onFocusAll();
        const countOfErrors = await isHasErrors();
        if (countOfErrors === 0) {
          ThirdScreen.init();
        }
      };

      isCompleted();
    });
  }


  static loadUserData() {
    const userData = getDataFromLocalStorage();
    if (userData) {
      const {
        phone = '',
        email = '',
        password = '',
        passwordConfirm = '',
      } = userData;

      const phoneInput = document.querySelector('input[data-name=phone]');
      phoneInput.value = phone;

      const emailInput = document.querySelector('input[data-name=email]');
      emailInput.value = email;

      const passwordInput = document.querySelector('input[data-name=password]');
      passwordInput.value = password;

      const passwordConfirmInput = document.querySelector('input[data-name=passwordConfirm]');
      passwordConfirmInput.value = passwordConfirm;
    }
  }
}

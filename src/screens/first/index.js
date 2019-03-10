import template from './index.tpl';
import './index.scss';

import SETTINGS from '../../settings';
import SecondScreen from '../second';
import isValidate from '../../components/validation';


const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user-data'));

const saveDataToLocalStorage = (field, value) => {
  const userData = Object.assign({}, getDataFromLocalStorage(), { [field]: value });
  localStorage.setItem('user-data', JSON.stringify(userData));
};

export default class FirstScreen {
  static init() {
    this.draw();
    this.setActivePage();
    this.validationForm();
    this.onRadioSectionClick();
    this.onAgreementSectionClick();
    this.loadUserData();
    this.onButtonClick();
  }


  static draw() {
    const body = document.querySelector('body');
    body.className = '';
    body.classList.add('color-scheme_first');
    const wrapper = document.querySelector('.content-area__wrapper');
    wrapper.innerHTML = template;
  }


  static setActivePage() {
    const navButton = document.querySelector('[data-name=scheme-first]');
    const activeButton = document.querySelector('.active-item');
    if (activeButton) {
      activeButton.classList.remove('active-item');
    }
    navButton.classList.add('active-item');
  }


  static validationForm() {
    const form = document.querySelector('.form-area');
    const { birthday } = SETTINGS;

    form.addEventListener('focus', (e) => {
      const input = e.target;
      const dataName = input.dataset.name;

      const addMaskTo = (event) => {
        event.preventDefault();
        if (event.code.includes('Digit')) {
          input.value += event.key;
        }

        switch (input.value.length) {
          case 2:
            input.value += '/';
            break;
          case 5:
            input.value += '/';
            break;
          case 9:
            input.value = input.value.slice(0, -1);
            break;
          default:
            input.value = input.value;
            break;
        }
      };

      if (birthday.includes(dataName)) {
        input.placeholder = 'мм/дд/гг';
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


  static onRadioSectionClick() {
    const radioSection = document.querySelector('.radio-section');
    radioSection.addEventListener('click', (e) => {
      const dataName = e.target.dataset.name;
      if (dataName === 'male' || dataName === 'female') {
        const selection = [].find.call(radioSection.children,
          el => el.tagName === 'INPUT' && el.dataset.name === dataName);
        const inputList = document.querySelectorAll('.radio-section > input');
        [].map.call(inputList, (input) => {
          input.removeAttribute('checked');
        });
        selection.setAttribute('checked', 'checked');
        saveDataToLocalStorage('sex', dataName);
      }
    });
  }


  static onAgreementSectionClick() {
    const agreementSection = document.querySelector('.agreement-section');
    agreementSection.addEventListener('click', (e) => {
      const dataName = e.target.dataset.name;
      e.preventDefault();
      if (dataName === 'agreement') {
        const selection = [].find.call(agreementSection.children,
          el => el.tagName === 'INPUT' && el.dataset.name === dataName);
        if (selection.hasAttribute('checked')) {
          selection.removeAttribute('checked');
          saveDataToLocalStorage(dataName, '');
        } else {
          selection.setAttribute('checked', 'checked');
          saveDataToLocalStorage(dataName, 'checked');
        }
      }
    });
  }


  static onButtonClick() {
    const button = document.querySelector('.form-area__button');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      const agreementInput = document.querySelector('input[data-name=agreement]');
      const sexRadioButton = document.querySelector('.radio-section > input[checked]');
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
        if (countOfErrors === 0 && agreementInput.hasAttribute('checked', 'checked')) {
          saveDataToLocalStorage('sex', sexRadioButton.dataset.name);
          SecondScreen.init();
        }
      };

      isCompleted();
    });
  }


  static loadUserData() {
    const userData = getDataFromLocalStorage();
    if (userData) {
      const {
        surname = '',
        name = '',
        patronymic = '',
        sex = 'male',
        birthday = '',
        agreement = '',
      } = userData;

      const surnameInput = document.querySelector('input[data-name=surname]');
      surnameInput.value = surname;

      const nameInput = document.querySelector('input[data-name=name]');
      nameInput.value = name;

      const patronymicInput = document.querySelector('input[data-name=patronymic]');
      patronymicInput.value = patronymic;

      const sexMaleInput = document.querySelector('input[data-name=male]');
      const sexFemaleInput = document.querySelector('input[data-name=female]');
      if (sex === 'female') {
        sexFemaleInput.setAttribute('checked', 'checked');
        sexMaleInput.removeAttribute('checked');
      } else {
        sexMaleInput.setAttribute('checked', 'checked');
        sexFemaleInput.removeAttribute('checked');
      }

      const birthdayInput = document.querySelector('input[data-name=birthday]');
      birthdayInput.value = birthday;

      const agreementInput = document.querySelector('input[data-name=agreement]');
      if (agreement === 'checked') {
        agreementInput.setAttribute('checked', 'checked');
      } else {
        agreementInput.removeAttribute('checked');
      }
    }
  }
}

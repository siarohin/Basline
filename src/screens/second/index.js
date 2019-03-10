import template from './index.tpl';
import './index.scss';

import isValidate from '../../components/validation';


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

    form.addEventListener('focus', (e) => {
      const input = e.target;
      const dataName = input.dataset.name;

      const onBlur = () => {
        if (dataName) {
          saveDataToLocalStorage(dataName, input.value);
        }
        isValidate(input, dataName);
        input.removeEventListener('blur', onBlur);
      };

      input.addEventListener('blur', onBlur);
    }, true);
  }


  static loadUserData() {
    const userData = getDataFromLocalStorage();
    if (userData) {
      const {
        email = '',
      } = userData;

      const emailInput = document.querySelector('input[data-name=email]');
      emailInput.value = email;
    }
  }
}

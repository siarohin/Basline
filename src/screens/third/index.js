import template from './index.tpl';
import './index.scss';

const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user-data'));

const saveDataToLocalStorage = (field, value) => {
  const userData = Object.assign({}, getDataFromLocalStorage(), { [field]: value });
  localStorage.setItem('user-data', JSON.stringify(userData));
};


export default class ThirdScreen {
  static init() {
    this.draw();
    this.setActivePage();
    this.loadUserData();
  }


  static draw() {
    const body = document.querySelector('body');
    body.className = '';
    body.classList.add('color-scheme_third');

    const wrapper = document.querySelector('.content-area__wrapper');
    wrapper.innerHTML = template;
  }


  static setActivePage() {
    const navButton = document.querySelector('[data-name=scheme-third]');
    const activeButton = document.querySelector('.active-item');

    if (activeButton) {
      activeButton.classList.remove('active-item');
    }

    navButton.classList.add('active-item');
  }


  static loadUserData() {
    const userData = getDataFromLocalStorage();
    if (userData) {
      const {
        phone = '',
      } = userData;

      const phoneElement = document.querySelector('p[data-name=phone] > span');
      phoneElement.innerHTML = phone.replace(/\s/g, '');
    }
  }
}

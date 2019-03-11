import template from './index.tpl';
import './index.scss';

// eslint-disable-next-line import/no-cycle
import startApp from '../../index';
import isValidate from '../../components/validation';
import pause from '../../utils';
import pseudoPlaceholder from '../../components/placeholder';


const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user-data'));

const saveDataToLocalStorage = (field, value) => {
  const userData = Object.assign({}, getDataFromLocalStorage(), { [field]: value });
  localStorage.setItem('user-data', JSON.stringify(userData));
};

const removeDataFromLocalStorage = () => {
  localStorage.removeItem('user-data');
};


export default class ThirdScreen {
  static async init() {
    this.draw();
    this.setActivePage();
    this.loadUserData();
    this.onButtonClick();
    await pause(500);
    await this.generateCode();
    this.validationForm();
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


  static validationForm() {
    const form = document.querySelector('.form-area');

    form.addEventListener('focus', (e) => {
      const input = e.target;
      const dataName = input.dataset.name;

      pseudoPlaceholder(input);

      const onBlur = () => {
        isValidate(input, dataName);
        input.removeEventListener('blur', onBlur);
      };

      input.addEventListener('blur', onBlur);
    }, true);
  }


  static onButtonClick() {
    const buttonArea = document.querySelector('.button-area');

    const onButtonAction = () => {
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
          this.returnToInitPage();
        }
      };

      isCompleted();
    };

    const onSendAction = () => {
      const { code } = getDataFromLocalStorage();
      // eslint-disable-next-line no-alert
      alert(code);
    };

    buttonArea.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.type === 'submit') {
        onButtonAction();
      } else {
        onSendAction();
      }
    });
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


  static generateCode() {
    const min = 0;
    const max = 9;
    const codeLength = 4;
    let randomNumber = '';

    for (let i = 0; i < codeLength; i += 1) {
      randomNumber += Math.round(Math.random() * (max - min) + min);
    }
    saveDataToLocalStorage('code', randomNumber);
    // eslint-disable-next-line no-alert
    alert(randomNumber);
  }


  static returnToInitPage() {
    const nav = document.querySelector('.pagination-container');
    const removeNavigation = async () => {
      await nav.remove();
      await removeDataFromLocalStorage();
      await startApp();
    };
    removeNavigation();
  }
}

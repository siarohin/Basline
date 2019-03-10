import FirstScreen from '../../screens/first';

import './index.scss';
import template from './index.tpl';


export default () => {
  const header = document.querySelector('.on-main-page');
  header.insertAdjacentHTML('beforeend', template);

  const navigationContainer = document.querySelector('.pagination-container');

  if (navigationContainer) {
    navigationContainer.addEventListener('click', (e) => {
      e.preventDefault();
      const button = e.target;
      const dataName = button.dataset.name;
      const screen = document.querySelector('body').className.replace('color-scheme_', '');
      const buttonToNextScreen = document.querySelector('.custom-button');

      if (screen === 'first') {
        switch (dataName) {
          case 'scheme-first':
            break;
          case 'scheme-second':
            buttonToNextScreen.click();
            break;
          case 'scheme-third':
            break;
          default:
            break;
        }
      }

      if (screen === 'second') {
        switch (dataName) {
          case 'scheme-first':
            FirstScreen.init();
            break;
          case 'scheme-second':
            break;
          case 'scheme-third':
            buttonToNextScreen.click();
            break;
          default:
            break;
        }
      }

      if (screen === 'third') {
        switch (dataName) {
          case 'scheme-first':
            break;
          case 'scheme-second':
            break;
          case 'scheme-third':
            break;
          default:
            break;
        }
      }
    });
  }
};

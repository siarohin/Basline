import FirstScreen from '../../screens/first';
import SecondScreen from '../../screens/second';
import ThirdScreen from '../../screens/third';

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

      switch (dataName) {
        case 'scheme-first':
          FirstScreen.init();
          break;
        case 'scheme-second':
          SecondScreen.init();
          break;
        case 'scheme-third':
          ThirdScreen.init();
          break;
        default:
          break;
      }
    });
  }
};

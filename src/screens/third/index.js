import template from './index.tpl';
import './index.scss';

export default class ThirdScreen {
  static init() {
    this.draw();
    this.setActivePage();
  }


  static draw() {
    const body = document.querySelector('body');
    body.className = '';
    body.classList.add('color-scheme_third');

    const wrapper = document.querySelector('.content-area__wrapper');
    wrapper.insertAdjacentHTML('beforeend', template);
  }


  static setActivePage() {
    const navButton = document.querySelector('[data-name=scheme-third]');
    const activeButton = document.querySelector('.active-item');

    if (activeButton) {
      activeButton.classList.remove('active-item');
    }

    navButton.classList.add('active-item');
  }
}

import template from './index.tpl';
import './index.scss';

export default class SecondScreen {
  static init() {
    this.draw();
    this.setActivePage();
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
}

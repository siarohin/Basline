import './index.scss';
import template from './index.tpl';

export default (element) => {
  const addPlaceholder = (placeholder) => {
    element.insertAdjacentHTML('afterend', template(placeholder));
    element.classList.add('without-placeholder');
  };

  const clearPlaceholder = () => {
    const pseudoPlaceholders = document.querySelectorAll('.pseudo-placeholder');
    if (pseudoPlaceholders) {
      [].forEach.call(pseudoPlaceholders, el => el.remove());
    }
    element.classList.remove('without-placeholder');
    element.removeEventListener('blur', clearPlaceholder);
  };

  const addActiveClass = () => {
    clearPlaceholder();
    element.classList.add('custom-input_active');
    element.removeEventListener('keypress', addActiveClass);
  };

  const clearActiveClass = () => {
    element.classList.remove('custom-input_active');
    element.removeEventListener('blur', clearActiveClass);
    element.removeEventListener('keypress', addActiveClass);
  };

  if (element.classList.contains('custom-input')) {
    addPlaceholder(element.placeholder);
    element.addEventListener('keypress', addActiveClass);
    element.addEventListener('blur', clearPlaceholder);
    element.addEventListener('blur', clearActiveClass);
  }
};

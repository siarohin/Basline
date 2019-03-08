import 'regenerator-runtime/runtime';
import './styles/main.scss';
import './styles/index.scss';

import FirstScreen from './screens/first';
import SecondScreen from './screens/second';
import ThirdScreen from './screens/third';

window.onload = () => {
  FirstScreen.init();
};

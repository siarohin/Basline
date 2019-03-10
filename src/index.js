/* eslint-disable import/no-cycle */
import 'regenerator-runtime/runtime';
import './styles/main.scss';
import './styles/index.scss';

import FirstScreen from './screens/first';
import addNavigation from './components/navigation';


const startApp = async () => {
  await addNavigation();
  FirstScreen.init();
};


window.onload = () => {
  startApp();
};


export default startApp;

import Keyboard from './js/Keyboard.js';

window.localStorage.setItem('lang', 'en');
const keyboard = new Keyboard(window.localStorage.getItem('lang'));
keyboard.init();

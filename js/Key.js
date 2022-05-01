import KeyService from './key.service.js';

export default class Key {
  constructor(keyCode, lang) {
    this.key = {};
    this.code = keyCode;
    this.allKeys = KeyService;

    if (lang === 'en') {
      this.allKeys.en.forEach(() => {
        this.key.en = this.allKeys[lang].find((keyData) => keyData.code === keyCode);
      });
    } else if (lang === 'ru') {
      this.allKeys.ru.forEach(() => {
        this.key.ru = this.allKeys[lang].find((keyData) => keyData.code === keyCode);
      });
    }

    this.sub = document.createElement('span');
    this.sub.textContent = this.key[lang].shift;

    this.title = document.createElement('span');
    this.title.textContent = this.key[lang].value;

    if (this.key[lang].shift === this.key[lang].value.toUpperCase()) {
      this.sub.innerHTML = '';
    }
    this.element = document.createElement('div');
    this.element.classList.add('key');
    this.element.classList.add(this.code);
    this.element.setAttribute('code', keyCode);
    this.element.append(this.sub, this.title);
    this.currentValue = this.key[lang].value;
  }
}

import KeyService from './key.service.js';

export default class Key {
  constructor(code, lang, keyboard) {
    this.key = {};
    this.keyCode = code;
    this.allKeys = KeyService;
    this.lang = lang;
    this.keyboard = keyboard;

    if (lang === 'en') {
      this.allKeys.en.forEach(() => {
        this.key.en = this.allKeys[lang].find((keyData) => keyData.code === this.keyCode);
      });
    } else if (lang === 'ru') {
      this.allKeys.ru.forEach(() => {
        this.key.ru = this.allKeys[lang].find((keyData) => keyData.code === this.keyCode);
      });
    }

    this.sub = document.createElement('span');
    this.sub.textContent = this.key[lang].shift;

    this.title = document.createElement('span');
    this.title.textContent = this.key[lang].value;

    if (this.key[lang].shift === this.key[lang].value.toUpperCase()) {
      this.sub.innerHTML = '';
    }
    this.keyWrapper = document.createElement('div');
    this.keyWrapper.classList.add('key');
    this.keyWrapper.setAttribute('code', this.keyCode);
    this.keyWrapper.append(this.sub, this.title);
    this.currentValue = this.key[lang].value;
  }

  keyDown() {
    const keyEl = document.querySelector(`div[code="${this.keyCode}"]`);
    keyEl.classList.add('keydown');
    if (this.key[this.lang].shift !== null) {
      this.writeText();
    }
  }

  keyUp() {
    const keyEl = document.querySelector(`div[code="${this.keyCode}"]`);
    keyEl.classList.remove('keydown');
  }

  writeText() {
    const { textarea } = this.keyboard;

    const cursorStart = textarea.selectionStart;
    const cursorEnd = textarea.selectionEnd;

    const partTextStart = this.keyboard.textarea.value.slice(0, cursorStart);
    const partTextEnd = this.keyboard.textarea.value.slice(cursorEnd);
    if (this.currentValue.length === 1) {
      this.keyboard.textarea.value = partTextStart + this.currentValue + partTextEnd;
      textarea.selectionStart = cursorStart + 1;
      textarea.selectionEnd = cursorStart + 1;
    }

    textarea.focus();
  }

  click() {
    this.writeText();
  }
}

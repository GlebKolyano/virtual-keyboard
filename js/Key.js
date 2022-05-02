import KeyService from './key.service.js';

export default class Key {
  constructor(code, lang, keyboard) {
    this.key = {};
    this.keyCode = code;
    this.allKeys = KeyService;
    this.lang = lang;
    this.keyboard = keyboard;
    this.textarea = keyboard.textarea;

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

  keyDown(isClick) {
    this.keyWrapper.classList.add('keydown');
    if (this.key[this.lang].shift !== null || this.key[this.lang].code === 'ArrowDown' || this.key[this.lang].code === 'ArrowUp') {
      this.writeText();
    } else {
      this.funcKeysOn();
    }
  }

  keyUp(isClick) {
    this.textarea.focus();
    this.keyWrapper.classList.remove('keydown');
  }

  funcKeysOn() {
    const cursorStart = this.textarea.selectionStart;
    const cursorEnd = this.textarea.selectionEnd;
    const textBeforeCursor = this.textarea.value.substring(0, cursorStart);
    const textAterCursor = this.textarea.value.substring(cursorStart, this.textarea.value.length);
    const V = this.textarea.value;
    const S = this.textarea.selectionStart;
    const E = this.textarea.selectionEnd;
    switch (this.keyCode) {
      case 'ArrowLeft':
        if (cursorStart > 0) {
          this.textarea.setSelectionRange(cursorStart - 1, cursorStart - 1);
        }
        break;
      case 'ArrowRight':
        this.textarea.setSelectionRange(cursorEnd + 1, cursorEnd + 1);
        break;
      case 'Backspace':
        if (S === E) {
          this.textarea.value = V.substring(0, S - 1) + V.substring(S, V.length);
          this.textarea.setSelectionRange(cursorStart - 1, cursorEnd - 1);
        } else {
          this.textarea.value = V.substring(0, S) + V.substring(E, V.length);
        }
        break;
      case 'Delete':
        if (S === E) {
          this.textarea.value = V.substring(0, S) + V.substring(S + 1, V.length);
          this.textarea.setSelectionRange(cursorStart, cursorEnd);
        } else {
          this.textarea.value = V.substring(0, S) + V.substring(E, V.length);
        }
        break;
      case 'CapsLock':
        break;
      case 'ShiftRight' || 'ShiftLeft':
        break;
      case 'ControlRight' || 'ControlLeft':
        break;
      case 'AltRight' || 'AltLeft':
        break;
      default:
        break;
    }
  }

  writeText() {
    const cursorStart = this.textarea.selectionStart;
    const cursorEnd = this.textarea.selectionEnd;

    const textBeforeCursor = this.textarea.value.slice(0, cursorStart);
    const textAterCursor = this.textarea.value.slice(cursorEnd);
    if (this.currentValue.length === 1) {
      this.textarea.value = textBeforeCursor + this.currentValue + textAterCursor;
      this.textarea.selectionStart = cursorStart + 1;
      this.textarea.selectionEnd = cursorStart + 1;
    }
  }
}

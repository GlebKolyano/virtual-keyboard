import KeyService from './key.service.js';

export default class Key {
  constructor(code, lang, keyboard) {
    this.key = {};
    this.keyCode = code;
    this.allKeys = KeyService;
    this.keyboard = keyboard;
    this.textarea = keyboard.textarea;
    this.isPress = false;

    this.allKeys.en.forEach(() => {
      this.key.en = this.allKeys.en.find((keyData) => keyData.code === this.keyCode);
    });

    this.allKeys.ru.forEach(() => {
      this.key.ru = this.allKeys.ru.find((keyData) => keyData.code === this.keyCode);
    });

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

    this.addEventListenerForKeys();
  }

  keyDown(isRepeat = false, isClick = false) {
    const { lang } = this.keyboard;
    this.keyWrapper.classList.add('keydown', 'active');
    if (this.key[lang].shift !== null || this.key[lang].code === 'ArrowDown' || this.key[lang].code === 'ArrowUp') {
      this.writeText();
    } else {
      this.funcKeysOn(isRepeat, isClick);
    }
  }

  keyUp() {
    this.textarea.focus();
    this.keyWrapper.classList.remove('keydown', 'active');

    switch (this.keyCode) {
      case 'CapsLock':
        this.keyWrapper.classList.toggle('func-key_active');
        this.keyboard.caps = !this.keyboard.caps;
        this.keyboard.capsLock();
        break;
      case 'ShiftRight':
        if (this.keyboard.shiftRight) {
          this.keyWrapper.classList.remove('func-key_active');
          this.keyboard.shiftRight = false;
          this.keyboard.shift();
          this.isPress = false;
        }
        break;
      case 'ShiftLeft':
        if (this.keyboard.shiftLeft) {
          this.keyWrapper.classList.remove('func-key_active');
          this.keyboard.shiftLeft = false;
          this.keyboard.shift();
          this.isPress = false;
        }
        break;
      default:
        break;
    }
  }

  keyLeave() {
    if (this.keyWrapper.classList.contains('keydown', 'active')) {
      this.keyWrapper.classList.remove('keydown', 'active');
    }
    if (!this.isPress) {
      if (this.keyCode === 'ShiftRight' && this.keyboard.shiftRight) {
        this.keyWrapper.classList.remove('func-key_active');
        this.keyboard.shiftRight = false;
        this.keyboard.shift();
      }
      if (this.keyCode === 'ShiftLeft' && this.keyboard.shiftLeft) {
        this.keyWrapper.classList.remove('func-key_active');
        this.keyboard.shiftLeft = false;
        this.keyboard.shift();
      }
    }
  }

  funcKeysOn(isRepeat) {
    const { caps } = this.keyboard;
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
      case 'ShiftRight':
        if (isRepeat === false) {
          this.keyWrapper.classList.add('func-key_active');
          this.keyboard.shiftRight = true;
          this.keyboard.shift();
        } else {
          this.isPress = true;
        }
        break;
      case 'ShiftLeft':
        if (isRepeat === false) {
          this.keyWrapper.classList.add('func-key_active');
          this.keyboard.shiftLeft = true;
          this.keyboard.shift();
        } else {
          this.isPress = true;
        }
        break;
      case 'ControlRight' || 'ControlLeft':
        break;
      case 'AltRight' || 'AltLeft':
        break;
      case 'Space':
        this.textarea.value = `${textBeforeCursor} ${textAterCursor}`;
        this.textarea.setSelectionRange(cursorEnd + 1, cursorEnd + 1);
        break;
      case 'Enter':
        this.textarea.value = `${textBeforeCursor}\n${textAterCursor}`;
        this.textarea.setSelectionRange(cursorEnd + 1, cursorEnd + 1);
        break;
      case 'Tab':
        this.textarea.value = `${textBeforeCursor}    ${textAterCursor}`;
        this.textarea.setSelectionRange(cursorEnd + 4, cursorEnd + 4);
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

  capsToggle() {
    const { lang } = this.keyboard;
    if (this.key[lang].shift) {
      if (this.key[lang].shift === this.key[lang].value.toUpperCase()) {
        if (this.currentValue !== this.key[lang].shift) {
          this.currentValue = this.key[lang].shift;
          this.title.innerHTML = this.currentValue;
        } else {
          this.currentValue = this.key[lang].value;
          this.title.innerHTML = this.currentValue;
        }
      }
    }
  }

  shiftToggle() {
    const { lang } = this.keyboard;
    if (this.key[lang].shift) {
      if (this.key[lang].shift === this.key[lang].value.toUpperCase()) {
        if (this.currentValue !== this.key[lang].shift) {
          this.currentValue = this.key[lang].shift;
          this.title.innerHTML = this.currentValue;
        } else {
          this.currentValue = this.key[lang].value;
          this.title.innerHTML = this.currentValue;
        }
      } else if (this.key[lang].shift !== this.key[lang].value.toUpperCase()) {
        if (this.currentValue === this.key[lang].shift) {
          this.sub.classList.remove('shift_active');
          this.currentValue = this.key[lang].value;
        } else {
          this.sub.classList.add('shift_active');
          this.currentValue = this.key[lang].shift;
        }
      }
    }
  }

  languageToggle() {
    const {
      lang, caps, shiftLeft, shiftRight,
    } = this.keyboard;
    const { shift, value } = this.key[lang];
    if (shift) {
      this.title.innerHTML = '';
      this.sub.innerHTML = '';
      if (!caps) {
        // выключен капс
        // включен шифт
        if (shiftLeft || shiftRight) {
          this.currentValue = shift;
          if (shift === value.toUpperCase()) {
            this.title.innerHTML = shift;
          } else if (shift !== value.toUpperCase()) {
            this.sub.classList.add('shift_active');
            this.title.innerHTML = value;
            this.sub.innerHTML = shift;
          }
        // выключен шифт
        } else if (!shiftLeft && !shiftRight) {
          this.currentValue = value;
          if (shift === value.toUpperCase()) {
            this.title.innerHTML = value;
          } else if (shift !== value.toUpperCase()) {
            this.sub.classList.remove('shift_active');
            this.title.innerHTML = value;
            this.sub.innerHTML = shift;
          }
        }
      } else if (caps) {
        // включен капс
        // включен шифт
        if (shiftLeft || shiftRight) {
          if (shift === value.toUpperCase()) {
            this.currentValue = value;
            this.title.innerHTML = value;
          } else if (shift !== value.toUpperCase()) {
            this.sub.classList.add('shift_active');
            this.currentValue = shift;
            this.title.innerHTML = value;
            this.sub.innerHTML = shift;
          }
        // выключен шифт
        } else if (!shiftLeft && !shiftRight) {
          if (shift === value.toUpperCase()) {
            this.currentValue = shift;
            this.title.innerHTML = shift;
          } else if (shift !== value.toUpperCase()) {
            this.sub.classList.remove('shift_active');
            this.currentValue = value;
            this.title.innerHTML = value;
            this.sub.innerHTML = shift;
          }
        }
      }
    }
  }

  addEventListenerForKeys() {
    switch (this.keyCode) {
      case 'Sound':
        this.keyWrapper.addEventListener('click', () => {
          this.keyboard.sound = !this.keyboard.sound;
          this.keyWrapper.classList.toggle('key-sound');
        });
        break;
      case 'Language':
        this.keyWrapper.addEventListener('click', () => {
          this.keyboard.changeLanguage();
        });
        break;
      default:
        break;
    }

    this.keyWrapper.addEventListener('mouseleave', (e) => {
      if (!e.target.closest('.key')) return;
      this.keyLeave();
    });
  }
}

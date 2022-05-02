import Key from './Key.js';

export default class Keyboard {
  constructor(lang) {
    this.lang = lang;

    this.shiftRight = false;
    this.shiftLeft = false;
    this.ctrlLeft = false;
    this.ctrlRight = false;
    this.altLeft = false;
    this.altRight = false;
    this.caps = false;
    this.allKeys = {};

    this.template = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['Sound', 'Language', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Sound'],
    ];

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.setAttribute('rows', 10);
    this.textarea.setAttribute('cols', 70);
    this.textarea.setAttribute('autofocus', true);
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.container.append(this.textarea, this.keyboard);
    document.body.append(this.container);
  }

  init() {
    this.drawKeys();
    this.listenEventListeners();
  }

  drawKeys() {
    this.template.forEach((row) => {
      const rowValues = document.createElement('div');
      rowValues.classList.add('keys-row');
      row.forEach((code) => {
        const key = new Key(code, this.lang, this);
        this.allKeys[code] = key;
        rowValues.append(key.keyWrapper);
      });
      this.keyboard.append(rowValues);
    });
  }

  listenEventListeners() {
    document.addEventListener('keyup', (e) => {
      e.preventDefault();
      if (this.allKeys[e.code]) {
        const key = this.allKeys[e.code];
        key.keyUp();
      }
    });
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      if (this.allKeys[e.code]) {
        const key = this.allKeys[e.code];
        key.keyDown();
      }
    });
    document.addEventListener('mousedown', (e) => {
      if (!e.target.closest('.key')) return;
      const keyEl = e.target.closest('.key');
      const key = this.allKeys[keyEl.getAttribute('code')];
      key.keyDown(true);
    });
    document.addEventListener('mouseup', (e) => {
      if (!e.target.closest('.key')) return;
      const keyEl = e.target.closest('.key');
      const key = this.allKeys[keyEl.getAttribute('code')];
      key.keyUp(true);
    });
  }

  shift() {
    Object.keys(this.allKeys).forEach((code) => {
      this.allKeys[code].shifOn();
    });
  }

  unshift() {
    Object.keys(this.allKeys).forEach((code) => {
      this.allKeys[code].shifOff();
    });
  }

  capsClick() {
    Object.keys(this.allKeys).forEach((code) => {
      this.allKeys[code].capsToggle();
    });
  }

  shiftClick() {
    Object.keys(this.allKeys).forEach((code) => {
      this.allKeys[code].shiftToggle();
    });
  }

  changeLanguage() {}
}

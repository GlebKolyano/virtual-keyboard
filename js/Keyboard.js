import Key from './Key.js';

export default class Keyboard {
  constructor(lang) {
    this.lang = 'en';
    this.template = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ];
    this.allKeys = {};

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

    this.drawKeys();
  }

  drawKeys() {
    this.template.forEach((row) => {
      const rowValues = document.createElement('div');
      rowValues.classList.add('keys-row');
      row.forEach((code) => {
        const key = new Key(code, this.lang);
        this.allKeys[code] = key;
        rowValues.append(key.element);
      });
      this.keyboard.append(rowValues);
    });
  }
}

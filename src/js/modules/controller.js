/** Controller */

import Config from './config';
import EventListener from '../ui/event_listener';
import Keyboard from '../ui/keyboard';

class Controller {
  constructor() {
    this.state = {};
    this.eventListeners = [];
    this.keyboard = new Keyboard({ onKeyDown: k => this.onKey(k) });
  }

  onKey(key) {
    switch (key.toLowerCase()) {
      case 'a':
        break;
      default:
        break;
    }
  }

  isKeyDown(key) {
    return this.keyboard.isKeyDown(key);
  }

  on(event, callback) {
    this.eventListeners.push(new EventListener(event, callback));
  }

  call(event, args) {
    this.eventListeners.forEach(e => e.call(event, args));
  }
}

export default Controller;

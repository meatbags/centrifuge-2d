/** Controller */

import Config from './config';
import EventListener from '../ui/event_listener';
import Keyboard from '../ui/keyboard';

class Controller {
  constructor() {
    this.state = {};
    this.eventListeners = [];
    this.ui = {};
    this.keyboard = new Keyboard({
      onKeyDown: k => this.onKey(k),
      onKeyUp: k => this.onKey(k),
    });
  }

  onKey(key) {
    for (const key in Config.Controller.bind) {
      this.ui[key] = this.keyboard.isAny(Config.Controller.bind[key]);
    }
  }

  isUI(key) {
    return this.ui[key];
  }

  on(event, callback) {
    this.eventListeners.push(new EventListener(event, callback));
  }

  call(event, args) {
    this.eventListeners.forEach(e => e.call(event, args));
  }
}

export default Controller;

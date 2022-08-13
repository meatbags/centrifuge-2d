/** App */

import Actor from './modules/actor';
import Controller from './modules/controller';
import Loop from './modules/loop';
import Scene from './modules/scene';

class App {
  constructor() {
    this.modules = {
      Actor: new Actor(),
      Controller: new Controller(),
      Loop: new Loop(),
      Scene: new Scene(),
    };

    // bind modules
    for (const key in this.modules) {
      if (typeof this.modules[key].bind === 'function')
        this.modules[key].bind(this);
    }
  }
}

window.addEventListener('load', () => {
  const app = new App();
});

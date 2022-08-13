/** Loop */

import Clock from '../util/clock';
import Config from './config';

class Loop {
  bind(root) {
    this.ref = {};
    this.ref.Scene = root.modules.Scene;
    this.ref.Controller = root.modules.Controller;

    //TODO
    let modules = Object.keys(root.modules).map(key => root.modules[key]);
    this.ref.toUpdate = modules.filter(m => typeof m.update === 'function');
    this.ref.toRender = modules.filter(m => typeof m.render === 'function');

    this.clock = new Clock();
    this._loop();
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    let delta = this.clock.getDelta();
    this.ref.Controller.call(Config.Event.UPDATE, delta);
    this.ref.Controller.call(Config.Event.RENDER, delta);
  }
}

export default Loop;

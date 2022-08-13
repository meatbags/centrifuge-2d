/** Loop */

import Clock from '../util/clock';
import Config from './config';

class Loop {
  bind(root) {
    this.ref = {};
    this.ref.Scene = root.modules.Scene;
    this.ref.Controller = root.modules.Controller;
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

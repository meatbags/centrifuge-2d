/** Loop */

import Clock from '../util/clock';
import Config from './config';

class Loop {
  bind(root) {
    this.ref = {};
    this.ref.Scene = root.modules.Scene;
    this.ref.Controller = root.modules.Controller;

    // get targets
    let modules = Object.keys(root.modules).map(key => root.modules[key]);
    this.ref.toUpdate = modules.filter(m => typeof m.update === 'function');
    this.ref.toRender = modules.filter(m => typeof m.render === 'function');
  }

  start() {
    this.clock = new Clock();
    this._loop();
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    let delta = this.clock.getDelta();
    this.ref.toUpdate.forEach(m => m.update(delta));
    this.ref.toRender.forEach(m => m.render(this.ref.Scene.ctx));
  }
}

export default Loop;

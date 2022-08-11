/** Loop */

import Clock from '../util/clock';

class Loop {
  constructor() {}

  bind(root) {
    this.ref = {};
    this.ref.Scene = root.modules.Scene;
    this.clock = new Clock();
    this._loop();
  }

  _loop() {
    requestAnimationFrame(() => this._loop());
    let delta = this.clock.getDelta();
    this.ref.Scene.update(delta);
    this.ref.Scene.render(delta);
  }
}

export default Loop;

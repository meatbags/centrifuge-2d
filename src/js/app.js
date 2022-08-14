/** App */

import Actor from './modules/actor';
import Camera from './modules/camera';
import Controller from './modules/controller';
import Loop from './modules/loop';
import PhysicsWorld from './modules/physics_world';
import Scene from './modules/scene';

class App {
  constructor() {
    this.modules = {
      Actor: new Actor(),
      Camera: new Camera(),
      Controller: new Controller(),
      Scene: new Scene(),
      PhysicsWorld: new PhysicsWorld(),
      Loop: new Loop(),
    };

    // bind modules
    for (const key in this.modules) {
      if (typeof this.modules[key].bind === 'function')
        this.modules[key].bind(this);
    }

    // run loop
    this.modules.Loop.start();
  }
}

window.addEventListener('load', () => {
  const app = new App();
});

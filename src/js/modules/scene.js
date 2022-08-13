/** Scene */

import Centrifuge from './centrifuge';
import Config from './config';
import Round from '../util/round';
import Vector from '../util/vector';
import Line from '../util/line';

class Scene {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');

    this.objects = [
      new Centrifuge({
        position: new Vector(0, 0),
        radius: 10,
        rotationSpeed: Math.PI / 4,
      }),
      new Centrifuge({
        position: new Vector(-15, -10),
        radius: 5,
        rotationSpeed: Math.PI,
      }),
    ];

    document.querySelector('.wrapper').appendChild(this.cvs);
  }

  bind(root) {
    this.ref = {};
    this.ref.Actor = root.modules.Actor;
    this.ref.Camera = root.modules.Camera;
    this.ref.Controller = root.modules.Controller;

    // events
    this.ref.Controller.on(Config.Event.UPDATE, delta => this.update(delta));
    this.ref.Controller.on(Config.Event.RENDER, delta => this.render(delta));
    window.addEventListener('resize', () => this.resize());

    // resize canvas
    this.resize();
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  update(delta) {
    this.objects.forEach(obj => obj.update(delta));
    this.ref.Camera.update(delta);
    this.ref.Actor.update(delta);
  }

  render(delta) {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

    // set style
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px monospace';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    // centre on player
    this.ref.Camera.transformContext(this.ctx);

    // draw objects
    this.objects.forEach(obj => obj.render(this.ctx));
    this.ref.Actor.render(this.ctx);

    // restore
    this.ref.Camera.restoreContext(this.ctx);
  }
}

export default Scene;

/** Scene */

import Centrifuge from './centrifuge';
import Config from './config';
import Round from '../util/round';
import Vector from '../util/vector';

class Scene {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.state = {age: 0, scale: 15};
    this.centrifuge = new Centrifuge({
      position: new Vector(0, 0),
      radius: 10,
      rotationSpeed: Math.PI / 4,
    });
    document.querySelector('.wrapper').appendChild(this.cvs);
  }

  bind(root) {
    this.ref = {};
    this.ref.Actor = root.modules.Actor;
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
    this.state.age += delta;
    this.centrifuge.update(delta);
    this.ref.Actor.update(delta);
  }

  render(delta) {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

    // centre on player
    let px = this.ref.Actor.position.x * this.state.scale;
    let py = this.ref.Actor.position.y * this.state.scale;
    this.ctx.save();
    this.ctx.translate(this.cvs.width/2-px, this.cvs.height/2-px);
    this.ctx.scale(this.state.scale, this.state.scale);
    this.ctx.rotate(-this.ref.Actor.up.angle() - Math.PI/2);

    // draw objects
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px monospace';
    this.ctx.lineWidth = 2 / this.state.scale;
    this.ctx.lineCap = 'round';
    this.centrifuge.render(this.ctx);

    this.ref.Actor.render(this.ctx);

    // restore
    this.ctx.restore();
  }
}

export default Scene;

/** Scene */

import Centrifuge from './centrifuge';
import Round from '../util/round';
import Vector from '../util/vector';

class Scene {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.state = {age: 0};
    this.centrifuge = new Centrifuge({
      position: new Vector(0, 0),
      radius: 100,
      rotationSpeed: Math.PI / 4,
    });
    document.querySelector('.wrapper').appendChild(this.cvs);
  }

  bind(root) {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  update(delta) {
    this.state.age += delta;
    this.centrifuge.update(delta);
  }

  render(delta) {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);

    // centre
    this.ctx.save();
    this.ctx.translate(this.cvs.width/2, this.cvs.height/2);

    // draw
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px monospace';
    this.ctx.lineWidth = 2;
    this.centrifuge.render(this.ctx);

    // restore
    this.ctx.restore();
  }
}

export default Scene;

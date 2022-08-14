/** Scene */

import Circle from '../util/circle';
import Config from './config';
import Vector from '../util/vector';
import Round from '../util/round';

class Scene {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.children = [];
    let circle = new Circle(new Vector(0, 15), 0.5);
    this.children.push(circle);
    document.querySelector('.wrapper').appendChild(this.cvs);
  }

  bind(root) {
    this.ref = {};
    this.ref.Actor = root.modules.Actor;
    this.ref.Camera = root.modules.Camera;
    this.ref.Controller = root.modules.Controller;

    // events
    window.addEventListener('resize', () => this.resize());

    // resize canvas
    this.resize();
  }

  resize() {
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  update(delta) {
    this.children.forEach(obj => {
      if (obj.update) obj.update(delta);
    });

    // prepare context
    this.ref.Camera.restoreContext(this.ctx);
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '15px monospace';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    // draw stats
    let stats = [
      'UP: ' + Round(this.ref.Actor.up.x, 2) + ', ' + Round(this.ref.Actor.up.y, 2),
      'CAMERA: ' + Round(this.ref.Camera.rotation / Math.PI, 3) + ' PI',
      'G-FORCE: ' + Round(),
    ];
    stats.forEach((stat, i) => {
      this.ctx.fillText(stat, 20, 30 + 15 * i);
    });

    // transform context
    this.ref.Camera.transformContext(this.ctx);
  }

  render() {
    this.children.forEach(obj => obj.render(this.ctx));

    // grid
    for (let x=0; x<=15; x++) {
      for (let y=0; y<=15; y++) {
        this.ctx.fillRect(x, y, 0.1, 0.1);
      }
    }
  }
}

export default Scene;

/** Scene */

import Centrifuge from './centrifuge';
import Circle from '../util/circle';
import Config from './config';
import Round from '../util/round';
import Vector from '../util/vector';
import Line from '../util/line';
import CommonTangents from '../util/common_tangents';

class Scene {
  constructor() {
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');

    this.objects = [
      new Centrifuge({
        position: new Vector(0, 0),
        radius: 10,
        rotationSpeed: Math.PI / 4,
        ladders: [0],
      }),
      new Centrifuge({
        position: new Vector(15, 15),
        radius: 5,
        rotationSpeed: Math.PI,
      }),
      new Circle(new Vector(0, 15), 0.5),
    ];

    this.lines = CommonTangents(this.objects[0].circle, this.objects[1].circle);
    console.log(this.lines);

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
    this.objects.forEach(obj => {
      if (obj.update) obj.update(delta);
    });this.ref.Camera.update(delta);
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
    this.lines.forEach(line => line.render(this.ctx));
    this.objects.forEach(obj => obj.render(this.ctx));
    this.ref.Actor.render(this.ctx);

    // grid
    for (let x=0; x<=15; x++) {
      for (let y=0; y<=15; y++) {
        this.ctx.fillRect(x, y, 0.1, 0.1);
      }
    }

    // restore
    this.ref.Camera.restoreContext(this.ctx);
  }
}

export default Scene;

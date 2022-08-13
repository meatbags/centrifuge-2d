/** Actor */

import Config from './config';
import Circle from '../util/circle';
import DrawArrow from '../util/draw_arrow';
import Vector from '../util/vector';

class Actor {
  constructor() {
    this.up = new Vector(0, 1);
    this.forward = new Vector(1, 0);
    this.position = new Vector(0, 0);
    this.motion = new Vector(0, 0);
    this.shape = new Circle(this.position, 0.25);
  }

  bind(root) {
    this.ref = {};
    this.ref.Controller = root.modules.Controller;
    this.ref.PhysicsWorld = root.modules.PhysicsWorld;

    //test
    window.addEventListener('click', () => {
      let r = Math.random() * 2 * Math.PI;
      this.up.rotate(r);
    });
  }

  update(delta) {
    // set direction
    // this.up.set(0, 1);
    this.forward.copy(this.up).rotate(-Math.PI / 2);

    // get input
    let input = new Vector();
    if (this.ref.Controller.isUI(Config.Event.UI_RIGHT)) input.x += 1;
    if (this.ref.Controller.isUI(Config.Event.UI_LEFT)) input.x -= 1;
    if (this.ref.Controller.isUI(Config.Event.UI_UP)) input.y += 1;
    if (this.ref.Controller.isUI(Config.Event.UI_DOWN)) input.y -= 1;
    input.normalise();

    // set motion vector
    let forward = this.forward.clone().multiplyScalar(input.x * Config.Actor.speed);
    let up = this.up.clone().multiplyScalar(input.y * Config.Actor.speed);
    let motion = forward.clone().add(up);

    // apply motion
    this.position.x += motion.x * delta;
    this.position.y += motion.y * delta;
  }

  render(ctx) {
    DrawArrow(ctx, this.position, this.up, Config.Actor.height);
    DrawArrow(ctx, this.position, this.forward, 1);
    ctx.beginPath();
    ctx.arc(this.shape.position.x, this.shape.position.y, this.shape.radius, 0, Math.PI*2);
    ctx.fill();
  }
}

export default Actor;

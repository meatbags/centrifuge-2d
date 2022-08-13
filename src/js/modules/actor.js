/** Actor */

import Vector from '../util/vector';
import Circle from '../util/circle';
import DrawArrow from '../util/draw_arrow';

class Actor {
  constructor() {
    this.up = new Vector(0, 1);
    this.forward = new Vector(1, 0);
    this.height = 1.8;
    this.position = new Vector(0, -10);
    this.motion = new Vector(0, 0);
    this.shape = new Circle(this.position, 0.25);
  }

  bind(root) {
    this.ref = {};
    this.ref.Controller = root.modules.Controller;
    this.ref.PhysicsWorld = root.modules.PhysicsWorld;
  }

  update(delta) {
    // let grounded = this.isGrounded();
    // TODO IF GROUNDED


    this.position.x += this.motion.x * delta;
    this.position.y += this.motion.y * delta;
    //this.up.rotate(Math.PI / 10 * delta);
    this.forward.copy(this.up).rotate(Math.PI / 2);
  }

  render(ctx) {
    DrawArrow(ctx, this.position, this.up, this.height);
    DrawArrow(ctx, this.position, this.forward, 1);
    ctx.beginPath();
    ctx.arc(this.shape.position.x, this.shape.position.y, this.shape.radius, 0, Math.PI*2);
    ctx.fill();
  }
}

export default Actor;

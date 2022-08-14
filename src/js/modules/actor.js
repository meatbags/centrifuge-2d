/** Actor */

import Config from './config';
import Circle from '../util/circle';
import DrawArrow from '../util/draw_arrow';
import Vector from '../util/vector';

class Actor {
  constructor() {
    this.up = new Vector(0, 1);
    this.forward = new Vector(1, 0);
    this.position = new Vector(0, -10);
    this.motion = new Vector(0, 0);
    this.snapped = false;

    // collision shape
    this.circle = new Circle(this.position, 0.5);
  }

  bind(root) {
    this.ref = {};
    this.ref.Controller = root.modules.Controller;
    this.ref.PhysicsWorld = root.modules.PhysicsWorld;
  }

  update(delta) {
    // check if snapped
    this.snapped = this.ref.PhysicsWorld.isSnapped(this.circle);

    // snapped to world
    if (this.snapped) {
      this.ref.PhysicsWorld.snapToWorld(this.circle, this.up, delta);
      this.forward.copy(this.up).rotate(-Math.PI / 2);

      // get motion
      let input = new Vector();
      let onLadder = false;
      let x = 0;
      let y = 0;

      // get input
      if (this.ref.Controller.isUI(Config.Event.UI_RIGHT)) input.x += 1;
      if (this.ref.Controller.isUI(Config.Event.UI_LEFT)) input.x -= 1;
      if (this.ref.Controller.isUI(Config.Event.UI_UP)) input.y += 1;
      if (this.ref.Controller.isUI(Config.Event.UI_DOWN)) input.y -= 1;

      // apply ladder movement
      if (onLadder && input.y !== 0) {
        input.normalise();
        x = input.x * Config.Actor.speed;
        y = input.y * Config.Actor.speed;
        let forward = this.forward.clone().multiplyScalar(x);
        let up = this.up.clone().multiplyScalar(y);
        this.motion = forward.clone().add(up);
        this.position.x += this.motion.x * delta;
        this.position.y += this.motion.y * delta;

      // apply centrifugal jump
      } else if (!onLadder && this.ref.Controller.isUI(Config.Event.UI_JUMP)) {
        let v = this.ref.PhysicsWorld.getTangentialVelocity(this.circle);
        x = input.x * Config.Actor.speed + v;
        y = Config.Actor.jumpImpulse;
        let forward = this.forward.clone().multiplyScalar(x);
        let up = this.up.clone().multiplyScalar(y);
        this.motion = forward.clone().add(up);
        this.position.x += this.motion.x * delta;
        this.position.y += this.motion.y * delta;

      // apply centrifugal movement
      } else {
        x = input.x * Config.Actor.speed;
        this.motion = this.forward.clone().multiplyScalar(x);
        let dir = Math.sign(this.forward.dot(this.motion)) * Math.sign(input.x);
        this.ref.PhysicsWorld.moveInCentrifuge(this.circle, dir * x * delta);
      }

    // floating -- move, snap to world
    } else {
      this.position.x += this.motion.x * delta;
      this.position.y += this.motion.y * delta;
      this.ref.PhysicsWorld.snapToWorld(this.circle, this.up, delta);
      this.forward.copy(this.up).rotate(-Math.PI / 2);
    }
  }

  render(ctx) {
    DrawArrow(ctx, this.position, this.up, 2);
    DrawArrow(ctx, this.position, this.forward, 2);
    DrawArrow(ctx, this.position, this.motion, 3);
    ctx.beginPath();
    ctx.arc(this.circle.position.x, this.circle.position.y, this.circle.radius, 0, Math.PI*2);
    ctx.fill();
  }
}

export default Actor;

/** Camera */

import Vector from '../util/vector';
import MinAngleBetween from '../util/min_angle_between';
import Lerp from '../util/lerp';

class Camera {
  constructor() {
    this.position = new Vector();
    this.centre = new Vector();
    this.rotation = 0;
    this.zoom = 15;
    this.axis = new Vector(1, -1);
    this.age = 0;
  }

  bind(root) {
    this.ref = {};
    this.ref.Actor = root.modules.Actor;
    this.position.copy(this.ref.Actor.position);
    this.rotation = this.getTargetRotation();
  }

  getTargetRotation() {
    return this.ref.Actor.up.angle() - Math.PI/2;
  }

  getTransformedPosition(p) {
    /*
    TODO
    let t = p.clone();
    t.sub(this.position);
    t.rotate(-this.rotation);
    t.scale(this.zoom);
    */
  }

  transformContext(ctx) {
    // transform context to camera space
    let centre = new Vector(window.innerWidth / 2, window.innerHeight / 2);
    let camera = new Vector(this.position.x, this.position.y);
    ctx.translate(camera.x, camera.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.zoom, this.zoom);
    ctx.scale(this.axis.x, this.axis.y);
    ctx.translate(-camera.x, -camera.y);
    camera.rotate(-this.rotation);
    centre.rotate(-this.rotation);
    ctx.translate((centre.x - camera.x) / (this.axis.x * this.zoom), (centre.y - camera.y) / (this.axis.y * this.zoom));
    ctx.lineWidth = ctx.lineWidth / this.zoom;
  }

  restoreContext(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  update(delta) {
    this.age += delta;
    this.position.lerp(this.ref.Actor.position, 0.5);
    let angle = MinAngleBetween(this.rotation, this.getTargetRotation());
    this.rotation += angle * 0.05;
  }
}

export default Camera;

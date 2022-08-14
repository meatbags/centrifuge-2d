/** Centrifuge */

import Vector from '../util/vector';
import Circle from '../util/circle';

const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;

class Centrifuge extends Circle {
  constructor(params) {
    super(params.position || new Vector(), params.radius || 1);
    // this.position = params.position || new Vector();
    // this.radius = params.radius || 1;
    this.circumference = params.radius * TAU;
    this.rotation = params.rotation || 0;
    this.rotationSpeed = params.rotationSpeed || 0;
    this.gForce = this.getGForce();
    this.ladders = params.ladders || null;
    // this.circle = new Circle(this.position, this.radius);
  }

  setGForce(g) {
    this.rotationSpeed = Math.sqrt(g / radius);
  }

  getEdgeVelocity(p) {
    let v = this.getUp(p);
    v.rotate(Math.sign(this.rotationSpeed) * -HALF_PI);
    v.multiplyScalar(this.rotationSpeed * this.radius);
    return v;
  }

  getUp(p) {
    return this.position.clone().sub(p).normalise();
  }

  getGForce() {
    return this.rotationSpeed * this.rotationSpeed * this.radius;
  }

  getCentrifugalForce(mass) {
    return mass * this.getGForce;
  }

  update(delta) {
    this.rotation += this.rotationSpeed * delta;
  }

  render(ctx) {
    let r1 = this.rotation;
    let r2 = r1 + TAU;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, r1, r2);
    if (this.ladders) {
      this.ladders.forEach(ladder => {
        let x = this.position.x + Math.cos(this.rotation + ladder) * this.radius;
        let y = this.position.y + Math.sin(this.rotation + ladder) * this.radius;
        let from = new Vector(x, y);
        let step = 0.5;
        let vec = this.position.clone().sub(from).normalise().multiplyScalar(step);
        let vec2 = vec.clone().rotate(HALF_PI).normalise().multiplyScalar(0.5);
        for (let t=0; t<this.radius; t+=step) {
          x += vec.x;
          y += vec.y;
          ctx.moveTo(x-vec2.x, y-vec2.y);
          ctx.lineTo(x+vec2.x, y+vec2.y);
        }
      });
    }
    ctx.stroke();
  }
}

Centrifuge.prototype.isCentrifuge = true;

export default Centrifuge;

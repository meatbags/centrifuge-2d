/** Centrifuge */

import Vector from '../util/vector';
import Circle from '../util/circle';

const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const ONE_G = 9.80665;

class Centrifuge extends Circle {
  constructor(params) {
    super(params.position || new Vector(), params.radius || 1);

    this.rotation = params.rotation || 0;
    this.ladders = params.ladders || null;
    this.rotationSpeed = 0;
    this.gForce = 0;

    if (params.rotationSpeed) {
      this.setRotationSpeed(params.rotationSpeed);
    } else if (params.gForce) {
      this.setGForce(params.gForce);
    }
  }

  setGForce(g) {
    this.gForce = g * ONE_G;
    this.rotationSpeed = Math.sqrt(this.gForce / this.radius);
    console.log('G=', this.gForce, 'W=', this.rotationSpeed/TAU, 'hz');
  }

  setRotationSpeed(s) {
    this.rotationSpeed = s;
    this.gForce = s * s * this.radius;
  }

  getEdgeVelocity(p) {
    let v = this.getUp(p);
    v.rotate(Math.sign(this.rotationSpeed) * -HALF_PI);
    v.multiplyScalar(this.rotationSpeed * this.radius);
    return v;
  }

  snapAndRotate(circle, up, delta) {
    this.snapCircleToEdge(circle);
    circle.position.rotateOnAxis(this.rotationSpeed * delta, this.position);
    up.copy(this.getUp(circle.position));
  }

  getTangentialVelocity() {
    return this.radius * this.rotationSpeed;
  }

  getUp(p) {
    return this.position.clone().sub(p).normalise();
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

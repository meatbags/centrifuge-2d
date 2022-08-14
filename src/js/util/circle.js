/** Circle */

import Vector from './vector';

const EDGE_THRESHOLD = 0.1;

class Circle {
  constructor(position=null, radius=1) {
    this.position = position || new Vector();
    this.radius = radius;
    this.radiusSquared = this.radius * this.radius;
  }

  pullCircleIn(c) {
    let n = c.position.clone().sub(this.position).normalise();
    n.multiplyScalar(this.radius - c.radius);
    c.position.copy(this.position);
    c.position.add(n);
  }

  pushCircleOut(c) {
    let n = c.position.clone().sub(this.position).normalise();
    n.multiplyScalar(this.radius + c.radius);
    c.position.copy(this.position);
    c.position.add(n);
  }

  isCircleOnEdge(c) {
    return Math.abs(c.position.distanceTo(this.position) - this.radius) <= c.radius + EDGE_THRESHOLD;
  }

  isCircleInside(c) {
    return this.position.distanceTo(c.position) <= this.radius + c.radius;
  }

  isPointInside(p) {
    return this.position.distanceSquaredTo(p) <= this.radiusSquared;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
    ctx.stroke();
  }
}

Circle.prototype.isCircle = true;

export default Circle;

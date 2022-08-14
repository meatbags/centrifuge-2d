/** Circle */

import Vector from './vector';

const EDGE_THRESHOLD = 0.01;
const TAU = Math.PI * 2;

class Circle {
  constructor(position=null, radius=1) {
    this.position = position || new Vector();
    this.radius = radius;
    this.radiusSquared = this.radius * this.radius;
    this.circumference = this.radius * TAU;
  }

  snapCircleToEdge(c) {
    let n = c.position.clone().sub(this.position).normalise();
    n.multiplyScalar(this.radius - c.radius);
    c.position.copy(this.position);
    c.position.add(n);
  }

  moveCircleAlongCircumference(circle, dist) {
    let r = dist / this.circumference * Math.PI * 2;
    circle.position.rotateOnAxis(r, this.position);
  }

  ejectCircle(c) {
    let n = c.position.clone().sub(this.position).normalise();
    n.multiplyScalar(this.radius + c.radius);
    c.position.copy(this.position);
    c.position.add(n);
  }

  isCircleOnEdge(c) {
    let d = c.position.distanceTo(this.position);
    return d <= this.radius + c.radius + EDGE_THRESHOLD &&
      d >= this.radius - c.radius - EDGE_THRESHOLD;
  }

  getNearestIntersect(c) {
    let p = c.position.clone().sub(this.position).normalise();
    p.multiplyScalar(this.radius).add(this.position);
    return p;
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

/** Circle */

import Vector from './vector';

class Circle {
  constructor(position=null, radius=1) {
    this.position = position || new Vector();
    this.radius = radius;
    this.radiusSquared = this.radius * this.radius;
  }

  isCircleIntersecting(c) {
    return this.position.distanceTo(c.position) - this.radius <= c.radius;
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

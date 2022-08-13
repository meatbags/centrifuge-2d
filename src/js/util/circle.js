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
}

Circle.prototype.isCircle = true;

export default Circle;

/** Vector */

class Vector {
  constructor() {
    if (arguments.length == 1 && arguments[0].isVector) {
      this.x = arguments[0].x;
      this.y = arguments[0].y;
    } else if (arguments.length == 2) {
      this.x = arguments[0];
      this.y = arguments[1];
    } else {
      this.x = this.y = 0;
    }
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  magnitude() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normalise() {
    let mag = this.magnitude();
    if (mag === 0) return;
    this.x /= mag;
    this.y /= mag;
    return this;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  distanceTo(v) {
    return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
  }

  distanceSquaredTo(v) {
    return Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2);
  }

  rotate(r) {
    let theta = this.angle();
    let mag = this.magnitude();
    this.x = Math.cos(theta + r) * mag;
    this.y = Math.sin(theta + r) * mag;
    return this;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  clone() {
    return new Vector(this);
  }
}

Vector.prototype.isVector = true;

export default Vector;

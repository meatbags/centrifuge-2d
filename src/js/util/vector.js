/** Vector */

class Vector {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normalise() {
    let mag = this.magnitude();
    if (mag === 0) return;
    this.x /= mag;
    this.y /= mag;
  }
}

export default Vector;

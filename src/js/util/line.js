/** Line */

class Line {
  constructor(a=0, b=0, c=0) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  fromPoints(a, b) {
    if (a.x == b.x) {
      this.a = 1;
      this.b = 0;
      this.c = -a.x;
    } else if (a.y == b.y) {
      this.a = 0;
      this.b = 1;
      this.c = -a.y;
    } else {
      this.a = (b.y - a.y) / (b.x - a.x);
      this.b = -1;
      this.c = a.y - this.a * a.x;
    }
    return this;
  }

  getX(y) {
   return this.a == 0 ? undefined : (this.b * y + this.c) / -this.a;
  }

  getY(x) {
    return this.b == 0 ? undefined : (this.a * x + this.c) / -this.b;
  }
}

export default Line;

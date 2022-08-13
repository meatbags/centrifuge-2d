/** Line */

class Line {
  constructor(a=0, b=0, c=0) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  fromPoints(a, b) {
    // vertical
    if (a.x == b.x) {
      this.a = 1;
      this.b = 0;
      this.c = -a.x;
    // horizontal
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

  render(ctx) {
    ctx.beginPath();
    // vertical
    if (this.b == 0) {
      let x = -this.c / this.a;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, window.innerHeight);

    // case horizontal
    } else if (this.a == 0) {
      let y = -this.c / this.b;
      ctx.moveTo(0, y);
      ctx.lineTo(window.innerWidth, y);
    } else {
      ctx.moveTo(-100, this.getY(-100));
      ctx.lineTo(100, this.getY(100));
    }
    ctx.stroke();
  }
}

export default Line;

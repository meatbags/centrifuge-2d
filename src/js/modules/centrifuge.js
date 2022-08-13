/** Centrifuge */

import Vector from '../util/vector';
import Circle from '../util/circle';

class Centrifuge {
  constructor(params) {
    this.position = params.position || new Vector();
    this.radius = params.radius || 1;
    this.circle = new Circle(this.position, this.radius);
    this.rotationSpeed = params.rotationSpeed || 0;
    this.ladders = params.ladders || null;
    this.state = {
      rotation: params.rotation || 0,
    };
  }

  update(delta) {
    this.state.rotation += this.rotationSpeed * delta;
  }

  render(ctx) {
    let r1 = this.state.rotation;
    let r2 = r1 + Math.PI * 2;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, r1, r2);
    ctx.moveTo(this.position.x, this.position.y);
    ctx.arc(this.position.x, this.position.y, this.radius/10, r1, r2);
    if (this.ladders) {
      this.ladders.forEach(ladder => {
        let x = this.position.x + Math.cos(this.state.rotation + ladder) * this.radius;
        let y = this.position.y + Math.sin(this.state.rotation + ladder) * this.radius;
        let from = new Vector(x, y);
        let step = 0.5;
        let vec = this.position.clone().sub(from).normalise().multiplyScalar(step);
        let vec2 = vec.clone().rotate(Math.PI/2).normalise().multiplyScalar(0.5);
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

export default Centrifuge;

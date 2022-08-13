/** Centrifuge */

import Vector from '../util/vector';
import Circle from '../util/circle';

class Centrifuge {
  constructor(params) {
    this.position = params.position || new Vector();
    this.radius = params.radius || 1;
    this.circle = new Circle(this.position, this.radius);
    this.rotationSpeed = params.rotationSpeed || 0;
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
    ctx.stroke();
  }
}

export default Centrifuge;

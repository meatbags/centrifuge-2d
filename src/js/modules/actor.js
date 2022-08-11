/** Actor */

import Vector from '../util/vector';

class Actor {
  constructor() {
    this.up = new Vector(0, 1);
    this.position = new Vector();
    this.motion = new Vector();
  }

  bind(root) {
    
  }

  update() {

  }

  draw(ctx) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }
}

export default Actor;

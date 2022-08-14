/** Physics */

import Centrifuge from './centrifuge';
import Vector from '../util/vector';

class PhysicsWorld {
  constructor() {
    this.children = [];

    // add centrifuges
    let c1 = new Centrifuge({
      position: new Vector(0, 0),
      radius: 10,
      rotationSpeed: Math.PI / 4,
      ladders: [0],
    });
    let c2 = new Centrifuge({
      position: new Vector(15, 15),
      radius: 5,
      rotationSpeed: Math.PI,
    });
    this.add(c1, c2);
  }

  add() {
    for (let i=0; i<arguments.length; i++) {
      this.children.push(arguments[i]);
    }
  }

  setActor(delta) {

  }

  setPositionOrientation(circle, up, delta) {
    // TODO: get most relevant object (figure out hierarchy)
    this.children.forEach(c => {
      // TODO: edge check to include motion vector not in UP
      if (!c.isCircleOnEdge(circle)) return;

      // set next position in centrifuge
      c.pullCircleIn(circle);
      circle.position.rotateOnAxis(c.rotation * delta, c.position);

      // set up vector
      up.copy(c.getUp(circle.position));
    });
  }

  update(delta) {
    this.children.forEach(obj => {
      if (typeof obj.update === 'function')
        obj.update(delta);
    });
  }

  render(ctx) {
    this.children.forEach(obj => {
      if (typeof obj.render === 'function')
        obj.render(ctx);
    });
  }
}

export default PhysicsWorld;

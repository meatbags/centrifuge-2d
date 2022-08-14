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
      gForce: 0.25,
      ladders: [0],
    });
    let c2 = new Centrifuge({
      position: new Vector(15, 35),
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

  isSnapped(circle) {
    for (let i=0; i<this.children.length; i++) {
      if (this.children[i].isCircleOnEdge(circle)) {
        return true;
      }
    }
    return false;
  }

  snapToWorld(circle, up, delta) {
    this.children.forEach(c => {
      if (c.isCircleOnEdge(circle)) {
        c.snapAndRotate(circle, up, delta);
      }
    });
  }

  moveInCentrifuge(circle, distance) {
    this.children.forEach(c => {
      if (c.isCircleOnEdge(circle)) {
        c.moveCircleAlongCircumference(circle, distance);
      }
    });
  }

  getTangentialVelocity(circle) {
    let v = 0;
    this.children.forEach(c => {
      if (c.isCircleOnEdge(circle)) {
        v = c.getTangentialVelocity();
      }
    });
    return v;
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

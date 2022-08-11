/** Clock */

class Clock {
  constructor() {
    this.state = {};
    this.reset();
  }

  reset() {
    this.state.now = performance.now();
    this.state.delta = 0;
    this.state.age = 0;
  }

  /** Get seconds since last call to delta */
  getDelta() {
    let now = performance.now();
    this.state.delta = (now - this.state.now) / 1000;
    this.state.now = now;
    this.state.age += this.state.delta;
    return this.state.delta;
  }

  getAge() {
    return this.state.age;
  }
}

export default Clock;

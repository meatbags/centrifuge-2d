/** Keyboard */

class Keyboard {
  constructor(params={}) {
    this.keys = {};
    this.callback = {};
    this.callback.onKeyDown = params.onKeyDown || null;
    this.callback.onKeyUp = params.onKeyUp || null;
    document.addEventListener('keydown', evt => { this.onKeyDown(evt); });
    document.addEventListener('keyup', evt => { this.onKeyUp(evt); });
    window.addEventListener('blur', evt => { this.onBlur(); });
  }

  onKeyDown(evt) {
    let key = evt.key.toLowerCase();
    this.keys[key] = true;
    if (this.callback.onKeyDown) this.callback.onKeyDown(key);
  }

  onKeyUp(evt) {
    let key = evt.key.toLowerCase();
    this.keys[key] = false;
    if (this.callback.onKeyUp) this.callback.onKeyUp(key);
  }

  onBlur() {
    for (const key in this.keys) {
      this.keys[key] = false;
    }
  }

  release(key) {
    const k = key.toLowerCase();
    this.keys[k] = false;
  }

  isAny(keys) {
    for (let i=0; i<keys.length; i++) {
      if (this.isKeyDown(keys[i])) {
        return true;
      }
    }
    return false;
  }

  isKeyDown(key) {
    const k = key.toLowerCase();
    return this.keys[k] !== undefined && this.keys[k] === true;
  }
}

export default Keyboard;

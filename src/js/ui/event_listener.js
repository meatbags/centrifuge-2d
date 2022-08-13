/** Event listener */

import { v4 as uuidv4 } from 'uuid';

class EventListener {
  constructor(event, callback) {
    this.id = uuidv4();
    this.event = event;
    this.callback = callback;
  }

  call(event, args) {
    if (this.event === event) {
      this.callback(args);
    }
  }
}

export default EventListener;

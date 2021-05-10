import { AbstractExperience } from '@soundworks/core/server';

class ControllerExperience extends AbstractExperience {
  constructor(server : any, clientTypes : string, options = {}) {
    super(server, clientTypes);
  }

  start() {
    super.start();
  }

  enter(client : any) {
    super.enter(client);
  }

  exit(client : any) {
    super.exit(client);
  }
}

export default ControllerExperience;
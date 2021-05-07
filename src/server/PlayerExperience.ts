import { AbstractExperience } from '@soundworks/core/server';

class PlayerExperience extends AbstractExperience {
  // TODO: Type and remove any
  constructor(server : any, clientTypes : any, options = {}) {
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

export default PlayerExperience;

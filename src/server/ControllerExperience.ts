import { AbstractExperience } from '@soundworks/core/server';

// TODO: Type and remove any
class ControllerExperience extends AbstractExperience {
  constructor(server : any, clientTypes : any, options = {}) {
    super(server, clientTypes);

    this.server = server;
  }

  async start() {
    super.start();

    // Create a global state
    const globalsState = await this.server.stateManager.create('globals');
    console.log('globalsState:', globalsState.getValues());
    // globalsState.set({ muteVisible : !globalsState.getValues()['applauseVisible'] });

    // create a list to store the player states
    this.controllerInputStates = new Set();

    this.server.stateManager.observe(async (schemaName : any, stateId : any, nodeId : any) => {
      //console.log('arguments:', schemaName, stateId, nodeId);
      
      // the callback is called thrice, for the controllerInputs, the playerInputs and the globals state
      switch(schemaName) {
        case 'controllerInput':
          const controllerInputState = await this.server.stateManager.attach(schemaName, stateId);
          console.log('New controllerInput connected: ' + nodeId);

          // Persist the connected state
          controllerInputState.onDetach(() => {
            this.controllerInputStates.delete(controllerInputState);
          });
          this.controllerInputStates.add(controllerInputState);

          // Bind the updates
          controllerInputState.subscribe(async (updates : object) => {
            console.log('updates from playerInputState and node ' + nodeId + ':', updates);
            globalsState.set(updates);
          });
          break;
        case 'playerInput':
          const playerInputState = await this.server.stateManager.attach(schemaName, stateId);
          console.log('New playerInputState connected: ' + nodeId);

          // Persist the connected state
          playerInputState.onDetach(() => {
            this.controllerInputStates.delete(playerInputState);
          });
          this.controllerInputStates.add(playerInputState);

          // Bind the updates
          playerInputState.subscribe(async (updates : object) => {
            console.log('updates from playerInputState and node ' + nodeId + ':', updates);
          });
          break;
      }
    });
  }

  enter(client : any) {
    super.enter(client);
  }

  exit(client : any) {
    super.exit(client);
  }
}

export default ControllerExperience;

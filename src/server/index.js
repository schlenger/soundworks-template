import 'source-map-support/register'; // enable sourcemaps in node
import * as soundworks from 'soundworks/server';
import PlayerExperience from './PlayerExperience';

// name of the environement
const envConfig = {
  env: (process.env.ENV || 'DEV'),
  gaId: '',
};

// initialize application with configuration options
soundworks.server.init({ appName: 'Template' }, envConfig);

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    socketIO: config.socketIO,
    appName: config.appName,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
    // environment
    env: config.env,
    gaId: config.gaId,
  };
});

// create the experience
// activities must be mapped to client types:
// - the `'player'` clients (who take part in the scenario by connecting to the
//   server through the root url) need to communicate with the `checkin` (see
// `src/server/playerExperience.js`) and the server side `playerExperience`.
// - we could also map activities to additional client types (thus defining a
//   route (url) of the following form: `/${clientType}`)
const experience = new PlayerExperience('player');

// start application
soundworks.server.start();

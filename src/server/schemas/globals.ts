// The current state of the displayed UI Modules
import Utils from '../utils/utils';
import controllerInputs from './controllerInput';

// TODO: Check if this makes sense. Probably the controllerinputs are a superclass of the globals
const globalsExension = {
  isExension: {
    type: 'boolean',
    default: true
  },
};

export default Utils.merge(controllerInputs, globalsExension);
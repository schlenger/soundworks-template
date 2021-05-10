// Everything that is sent from the Controller(Experience) to the server
export default {
  streamVisible: {
    type: 'boolean',
    default: false
  },
  streamUrl: {
    type: 'string',
    default: 'https://player.vimeo.com/video/507360544'
  },
  applauseVisible: {
    type: 'boolean',
    default: false,
  },
  textFieldVisible: {
    type: 'boolean',
    default: false
  },
  textFieldHeading: {
    type: 'string',
    default: ''
  },
  textFieldContent: {
    type: 'string',
    default: ''
  }
};
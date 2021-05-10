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
    default: 'This is an example heading'
  },
  textFieldContent: {
    type: 'string',
    default: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. '
  }
};
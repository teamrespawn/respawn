export function initialize(application) {
  application.inject('component', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize
};

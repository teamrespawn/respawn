import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-timer'],
  
  // Event handlers
  click() {
    this.send('respawn');
  },
  
  // Actions
  actions: {
    respawn: function() {
      Ember.Logger.debug('respawning');
    }
  }
});

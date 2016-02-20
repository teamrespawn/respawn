import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-button'],
  respawnTimer: Ember.inject.service(),
  
  // Event handlers
  click() {
    if(this.get('respawnTimer.expired')) {
      this.send('respawn');
    } else {
      Ember.Logger.debug('timer already running');
    }
  },
  
  // Actions
  actions: {
    respawn: function() {
      Ember.Logger.debug('respawning');
      this.get('respawnTimer').start();
    }
  }
});

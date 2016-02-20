import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-button'],
  respawnTimer: Ember.inject.service(),
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  canRespawn: Ember.computed('encampment.hasVacancy', 'respawnTimer.expired', function() {
    return this.get('encampment.hasVacancy') && this.get('respawnTimer.expired');
  }),
  
  // Event handlers
  click() {
    if(this.get('canRespawn')) {
      this.send('respawn');
    } else {
      Ember.Logger.debug('timer already running');
    }
  },
  
  // Actions
  actions: {
    respawn: function() {
      Ember.Logger.debug('respawning');
      this.get('encampment').addSurvivor();
      this.get('respawnTimer').start();
    }
  }
});

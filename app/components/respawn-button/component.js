import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-button'],
  classNameBindings: ['disabled'],
  respawnTimer: Ember.inject.service(),
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  canRespawn: Ember.computed('encampment.hasVacancy', 'respawnTimer.expired', function() {
    return this.get('encampment.hasVacancy') && this.get('respawnTimer.expired');
  }),
  disabled: Ember.computed.not('canRespawn'),
  
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
      $('.resource-list li').addClass('bounce');
      setTimeout(function() {
        $('.resource-list li').removeClass('bounce');
      }, 2000);
      this.get('respawnTimer').start();
    }
  }
});

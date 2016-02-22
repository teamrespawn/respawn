import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-button'],
  classNameBindings: ['disabled'],
  respawnTimer: Ember.inject.service(),
  session: Ember.inject.service(),
  giphy: Ember.inject.service(),
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
      $('li.survivors').addClass('bounce');
      this.get('giphy').newGiphyAction('respawn');
      setTimeout(function() {
        $('li.survivors').removeClass('bounce');
      }, 2000);
      this.get('respawnTimer').start();
    }
  }
});

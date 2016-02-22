import Ember from 'ember';

export default Ember.Component.extend({
  // Properties
  classNames: ['respawn-button'],
  classNameBindings: ['disabled'],
  respawnTimer: Ember.inject.service(),
  session: Ember.inject.service(),
  giphy: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  messages: Ember.inject.service(),
  
  canRespawn: Ember.computed('encampment.hasVacancy', 'respawnTimer.expired', function() {
    return this.get('encampment.hasVacancy') && this.get('respawnTimer.expired');
  }),
  disabled: Ember.computed.not('canRespawn'),
  
  // Event handlers
  click() {
    if(this.get('canRespawn')) {
      this.send('respawn');
    } else if(this.get('encampment.noVacancy')) {
      this.get('messages').newTextMessage("You don't have enough room in your camp...", "error");
    } else if(this.get('respawnTimer.running')) {
      this.get('messages').newTextMessage("You can't respawn just yet. Be patient.", "error");
    } else {
      this.get('messages').newTextMessage("Respawning isn't available right now.", "error");
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

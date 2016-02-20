import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['actions-panel'],
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  // Actions
  actions: {
    sendSearchParty: function() {
      this.get('encampment').collectResources(1);
    }
  }
});

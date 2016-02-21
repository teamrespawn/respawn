import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['actions-panel'],
  buildings: Ember.inject.service(),
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  resourceObserver: Ember.observer('encampment.resources.@each', function() {
    Ember.Logger.debug('resource values changed');
  }),
  
  actions: {
    purchaseBuilding: function(building) {
      this.get('encampment').purchaseBuilding(building);
    }
  }
});

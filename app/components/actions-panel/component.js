import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['actions-panel'],
  buildings: Ember.inject.service(),
  technologies: Ember.inject.service(),
  weapons: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  resourceObserver: Ember.observer('encampment.totalResources', function() {
    Ember.Logger.debug('resource values changed');
  })
});

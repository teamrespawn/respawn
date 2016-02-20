import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['resource-list'],
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  
  
});

import Ember from 'ember';

export default Ember.Object.extend({
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment')
});
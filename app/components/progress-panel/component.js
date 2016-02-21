import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['progress-panel'],
  activities: Ember.inject.service()
});

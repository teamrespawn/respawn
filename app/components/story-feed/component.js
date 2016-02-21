import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['story-feed'],
  messages: Ember.inject.service()
});

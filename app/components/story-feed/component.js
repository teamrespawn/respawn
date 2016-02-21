import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['story-feed'],
  messages: Ember.inject.service()
});

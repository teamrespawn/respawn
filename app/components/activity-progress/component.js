import Ember from 'ember';

export default Ember.Component.extend({
  progressWidth: Ember.computed('activity.timeLeft', function() {
    var percentLeft = (this.get('activity.timeLeft')/(this.get('activity.time') * 1000)) * 100;
    return `width: ${percentLeft}%;`;
  })
});

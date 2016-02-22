import Ember from 'ember';

export default Ember.Object.extend({
  timeLeft: 0,
  secondsLeft: Ember.computed('timeLeft', function() {
    return Math.round(this.get('timeLeft')/1000);
  }),
  hasTimeLeft: Ember.computed.gt('timeLeft', 0),
  
  start() {
    var time = this.get('time');
    this.set('timeLeft', (time * 1000));
    this.run();
  },
  
  run() {
    var activity = this;
    var interval = 25;
    
    if(this.get('hasTimeLeft')) {
      Ember.run.later(activity, function() {
        var time = this.get('timeLeft');
        this.set('timeLeft', time - interval);
        this.run();
      }, interval);
    }
  }
});
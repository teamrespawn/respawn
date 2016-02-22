import Ember from 'ember';

export default Ember.Service.extend({
  currentTime: 1,
  previousTime: 0,
  timeLeft: 0,
  expired: Ember.computed.lte('timeLeft', 0),
  running: Ember.computed.not('expired'),
  
  run() {
    var timer = this;
    
    if(this.get('running')) {
      Ember.run.later(timer, function() {
        this.decrementProperty('timeLeft');
        this.run();
      }, 1000);
    } else {
      Ember.Logger.debug('respawn timer expired');
    }
  },
  
  start() {
    var time = this.get('currentTime');
    var newTime = this.get('previousTime') + time;
    this.set('timeLeft', time);
    this.run();
    this.set('previousTime', time);
    this.set('currentTime', newTime);
  }
});

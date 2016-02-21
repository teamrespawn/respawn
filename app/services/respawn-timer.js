import Ember from 'ember';

export default Ember.Service.extend({
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
    this.set('timeLeft', 0);
    this.run();
  }
});

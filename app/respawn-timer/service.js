import Ember from 'ember';

export default Ember.Service.extend({
  timeLeft: 0,
  expired: Ember.computed.lte('timeLeft', 0),
  
  run() {
    var timer = this;
    
    if(Ember.computed.not('expired')) {
      Ember.run.later(timer, function() {
        this.decrementProperty('timeLeft');
        this.run();
      }, 1000);
    }
  },
  
  start() {
    this.set('timeLeft', 30);
    this.run();
  }
});

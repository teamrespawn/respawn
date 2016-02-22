import Ember from 'ember';
import Activity from './activity';

export default Ember.Service.extend({
  list: [],
  
  addActivity(title, time) {
    var activities = this;
    var activity = Activity.create({
      title: title,
      time: time
    });
    
    activity.start();
    var index = this.get('list').pushObject(activity);
    
    Ember.run.later(activities, function() {
      this.get('list').removeObject(index);
    }, time * 1000);
  }
});

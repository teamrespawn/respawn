import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  
  getCurrentLocation: function() {
    this.get('geolocation').getLocation();
  }.on('activate')
});

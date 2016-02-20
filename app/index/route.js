import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  
  beforeModel() {
    this.getCurrentLocation();
  },
  
  getCurrentLocation() {
    var route = this;
    
    this.get('geolocation').getLocation().then(function(geoObject) {
      route.joinOrCreateEncampment(geoObject);
    });
  },
  
  joinOrCreateEncampment(geoObject) {
    var lat = geoObject.coords.latitude;
    var lng = geoObject.coords.longitude;
    
    var currentEncampment = this.store.createRecord('encampment', {
      lat: lat,
      lng: lng
    });
    
    this.controllerFor('index').set('currentEncampment', currentEncampment);
  }
});

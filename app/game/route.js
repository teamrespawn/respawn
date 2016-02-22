import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  session: Ember.inject.service(),
  gameProgress: Ember.inject.service(),
  
  beforeModel() {
    var route = this;
    var currentLocation = this.get('geolocation').getLocation();
    
    currentLocation.then(function(geoObject) {
      route.joinOrCreateEncampment(geoObject);
    });
    
    if(route.get('gameProgress.atBeginning')) {
      route.get('gameProgress').advanceStage();
    }
    
    return currentLocation;
  },
  
  joinOrCreateEncampment(geoObject) {
    var lat = geoObject.coords.latitude;
    var lng = geoObject.coords.longitude;
    
    var currentEncampment = this.store.createRecord('encampment', {
      lat: lat,
      lng: lng
    });
    
    this.set('session.currentEncampment', currentEncampment);
  }
});


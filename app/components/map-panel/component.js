import Ember from 'ember';

export default Ember.Component.extend({
  geolocation: Ember.inject.service(),
  
  latitude: Ember.computed.alias('geolocation.geoObject.coords.latitude'),
  longitude: Ember.computed.alias('geolocation.geoObject.coords.longitude'),
  zoom: 10
  
});

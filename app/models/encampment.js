import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  survivors: DS.attr('number', {defaultValue: 0}),
  
  // Methods
  
  addSurvivor() {
    this.incrementProperty('survivors');
  }
});

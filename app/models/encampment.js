import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  survivors: DS.attr('number', {defaultValue: 0}),
  water: DS.attr('number', {defaultValue: 0}),
  food: DS.attr('number', {defaultValue: 0}),
  cloth: DS.attr('number', {defaultValue: 0}),
  fuel: DS.attr('number', {defaultValue: 0}),
  metal: DS.attr('number', {defaultValue: 0}),
  
  // Methods
  addSurvivor() {
    this.incrementProperty('survivors');
  },
  
  collectResources(numSurvivors) {
    Ember.run.later(function() {
      ['water', 'food', 'cloth', 'fuel', 'metal'].forEach(function(resource) {
        var count = numSurvivors * Math.round((Math.random() * 100));
        this.incrementProperty(resource, count);
      });
    }, 5000);
  }
});

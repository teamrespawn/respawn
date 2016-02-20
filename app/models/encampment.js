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
  tents: DS.attr('number', {defaultValue: 0}),
  shacks: DS.attr('number', {defaultValue: 0}),
  waterReservoirs: DS.attr('number', {defaultValue: 0}),
  fuelTanks: DS.attr('number', {defaultValue: 0}),
  scrapHeaps: DS.attr('number', {defaultValue: 0}),
  coldStorage: DS.attr('number', {defaultValue: 0}),
  
  // Survivor computed properties
  baseCapacity: 1,
  survivorCapacity: Ember.computed('tents', 'shacks', function() {
    var model = this;
    
    return ['tents', 'shacks'].reduce(function(previousValue, shelterType, index) {
      return previousValue + (model.get(shelterType) * (index + 1));
    }, this.get('baseCapacity'));
  }),
  vacancies: Ember.computed('survivorCapacity', 'survivors', function() {
    return this.get('survivorCapacity') - this.get('survivors');
  }),
  hasVacancy: Ember.computed.gt('vacancies', 0),
  
  // Water computed properties
  baseWaterCapacity: 1000,
  waterReservoirCapacity: 500,
  waterCapacity: Ember.computed('waterReservoirs', function() {
    return this.get('baseWaterCapacity') + (this.get('waterReservoirs') * this.get('waterReservoirCapacity'));
  }),
  waterSpaceAvailable: Ember.computed('waterCapacity', 'water', function() {
    return this.get('waterCapacity') - this.get('water');
  }),
  canAddWater: Ember.computed.gt('waterCapacity', 'water'),
  
  // Fuel computed properties
  baseFuelCapacity: 250,
  fuelTankCapacity: 100,
  fuelCapacity: Ember.computed('fuelTanks', function() {
    return this.get('baseFuelCapacity') + (this.get('fuelTanks') * this.get('fuelTankCapacity'));
  }),
  fuelSpaceAvailable: Ember.computed('fuelCapacity', 'fuel', function() {
    return this.get('fuelCapacity') - this.get('fuel');
  }),
  canAddFuel: Ember.computed.gt('waterCapacity', 'water'),
  
  // Metal computed properties
  baseMetalCapacity: 50,
  scrapHeapCapacity: 25,
  metalCapacity: Ember.computed('scrapHeaps', function() {
    return this.get('baseMetalCapacity') + (this.get('scrapHeaps') * this.get('scrapHeapCapacity'));
  }),
  metalSpaceAvailable: Ember.computed('metalCapacity', 'metal', function() {
    return this.get('metalCapacity') - this.get('metal');
  }),
  
  // Food computed properties
  baseFoodCapacity: 500,
  coldStorageCapacity: 50,
  foodCapacity: Ember.computed('coldStorage', function() {
    return this.get('baseFoodCapacity') + (this.get('coldStorage') * this.get('coldStorageCapacity'));
  }),
  foodSpaceAvailable: Ember.computed('foodCapacity', 'food', function() {
    return this.get('foodCapacity') - this.get('food');
  }),
  
  
  // Methods
  addSurvivor() {
    if(this.get('hasVacancy')) {
      this.incrementProperty('survivors');
    }
  },
  
  collectResources(numSurvivors) {
    var encampment = this;
    
    Ember.run.later(function() {
      ['water', 'food', 'cloth', 'fuel', 'metal'].forEach(function(resource) {
        var count = numSurvivors * Math.round((Math.random() * 100));
        encampment.incrementProperty(resource, count);
      });
    }, 1000);
  }
});

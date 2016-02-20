import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  
  // Survivors
  survivors: DS.attr('number', {defaultValue: 0}),
  tents: DS.attr('number', {defaultValue: 0}),
  shacks: DS.attr('number', {defaultValue: 0}),
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
  
  // Water
  water: DS.attr('number', {defaultValue: 0}),
  waterReservoirs: DS.attr('number', {defaultValue: 0}),
  baseWaterCapacity: 1000,
  waterReservoirCapacity: 500,
  waterCapacity: Ember.computed('waterReservoirs', function() {
    return this.get('baseWaterCapacity') + (this.get('waterReservoirs') * this.get('waterReservoirCapacity'));
  }),
  waterSpaceAvailable: Ember.computed('waterCapacity', 'water', function() {
    return this.get('waterCapacity') - this.get('water');
  }),
  canAddWater: Ember.computed.gt('waterCapacity', 'water'),
  
  // Food
  food: DS.attr('number', {defaultValue: 0}),
  coldStorage: DS.attr('number', {defaultValue: 0}),
  baseFoodCapacity: 500,
  coldStorageCapacity: 50,
  foodCapacity: Ember.computed('coldStorage', function() {
    return this.get('baseFoodCapacity') + (this.get('coldStorage') * this.get('coldStorageCapacity'));
  }),
  foodSpaceAvailable: Ember.computed('foodCapacity', 'food', function() {
    return this.get('foodCapacity') - this.get('food');
  }),
  
  // Cloth
  cloth: DS.attr('number', {defaultValue: 0}),
  warehouses: DS.attr('number', {defaultValue: 0}),
  baseClothCapacity: 500,
  warehouseCapacity: 50,
  clothCapacity: Ember.computed('warehouses', function() {
    return this.get('baseClothCapacity') + (this.get('warehouses') * this.get('warehouseCapacity'));
  }),
  clothSpaceAvailable: Ember.computed('clothCapacity', 'cloth', function() {
    return this.get('clothCapacity') - this.get('cloth');
  }),
  
  // Fuel
  fuel: DS.attr('number', {defaultValue: 0}),
  fuelTanks: DS.attr('number', {defaultValue: 0}),
  baseFuelCapacity: 250,
  fuelTankCapacity: 100,
  fuelCapacity: Ember.computed('fuelTanks', function() {
    return this.get('baseFuelCapacity') + (this.get('fuelTanks') * this.get('fuelTankCapacity'));
  }),
  fuelSpaceAvailable: Ember.computed('fuelCapacity', 'fuel', function() {
    return this.get('fuelCapacity') - this.get('fuel');
  }),
  canAddFuel: Ember.computed.gt('waterCapacity', 'water'),
  
  // Metal
  metal: DS.attr('number', {defaultValue: 0}),
  scrapHeaps: DS.attr('number', {defaultValue: 0}),
  baseMetalCapacity: 50,
  scrapHeapCapacity: 25,
  metalCapacity: Ember.computed('scrapHeaps', function() {
    return this.get('baseMetalCapacity') + (this.get('scrapHeaps') * this.get('scrapHeapCapacity'));
  }),
  metalSpaceAvailable: Ember.computed('metalCapacity', 'metal', function() {
    return this.get('metalCapacity') - this.get('metal');
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

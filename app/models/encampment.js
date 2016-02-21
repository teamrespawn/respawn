import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  
  // Resources
  resourceTypes: ['water', 'food', 'cloth', 'fuel', 'metal'],
  resources: Ember.computed.collect('water', 'food', 'cloth', 'fuel', 'metal'),
  
  // Buildings
  buildingTypes: ['tents', 'waterReservoirs', 'coldStorage', 'sheds', 'fuelTanks', 'scrapHeaps'],
  buildingCounts: Ember.computed.collect('tents', 'waterReservoirs', 'coldStorage', 'sheds', 'fuelTanks', 'scrapHeaps'),
  totalBuildings: Ember.computed.sum('buildingCounts'),
  
  // Survivors
  survivors: DS.attr('number', {defaultValue: 0}),
  tents: DS.attr('number', {defaultValue: 0}),
  shacks: DS.attr('number', {defaultValue: 0}),
  baseCapacity: 10,
  survivorCapacity: Ember.computed('tents', 'shacks', 'baseCapacity', function() {
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
  baseWaterCapacity: 10,
  waterReservoirCapacity: 10,
  waterCapacity: Ember.computed('baseWaterCapacity', 'waterReservoirs', 'waterReservoirCapacity', function() {
    return this.get('baseWaterCapacity') + (this.get('waterReservoirs') * this.get('waterReservoirCapacity'));
  }),
  waterSpaceAvailable: Ember.computed('waterCapacity', 'water', function() {
    return this.get('waterCapacity') - this.get('water');
  }),
  canAddWater: Ember.computed.gt('waterCapacity', 'water'),
  
  // Food
  food: DS.attr('number', {defaultValue: 0}),
  coldStorage: DS.attr('number', {defaultValue: 0}),
  baseFoodCapacity: 10,
  coldStorageCapacity: 10,
  foodCapacity: Ember.computed('baseFoodCapacity', 'coldStorage', 'coldStorageCapacity', function() {
    return this.get('baseFoodCapacity') + (this.get('coldStorage') * this.get('coldStorageCapacity'));
  }),
  foodSpaceAvailable: Ember.computed('foodCapacity', 'food', function() {
    return this.get('foodCapacity') - this.get('food');
  }),
  
  // Cloth
  cloth: DS.attr('number', {defaultValue: 0}),
  sheds: DS.attr('number', {defaultValue: 0}),
  baseClothCapacity: 10,
  shedCapacity: 10,
  clothCapacity: Ember.computed('baseClothCapacity', 'sheds', 'shedCapacity', function() {
    return this.get('baseClothCapacity') + (this.get('sheds') * this.get('shedCapacity'));
  }),
  clothSpaceAvailable: Ember.computed('clothCapacity', 'cloth', function() {
    return this.get('clothCapacity') - this.get('cloth');
  }),
  
  // Fuel
  fuel: DS.attr('number', {defaultValue: 0}),
  fuelTanks: DS.attr('number', {defaultValue: 0}),
  baseFuelCapacity: 10,
  fuelTankCapacity: 10,
  fuelCapacity: Ember.computed('baseFuelCapacity', 'fuelTanks', 'fuelTankCapacity', function() {
    return this.get('baseFuelCapacity') + (this.get('fuelTanks') * this.get('fuelTankCapacity'));
  }),
  fuelSpaceAvailable: Ember.computed('fuelCapacity', 'fuel', function() {
    return this.get('fuelCapacity') - this.get('fuel');
  }),
  canAddFuel: Ember.computed.gt('waterCapacity', 'water'),
  
  // Metal
  metal: DS.attr('number', {defaultValue: 0}),
  scrapHeaps: DS.attr('number', {defaultValue: 0}),
  baseMetalCapacity: 10,
  scrapHeapCapacity: 10,
  metalCapacity: Ember.computed('baseMetalCapacity', 'scrapHeaps', 'scrapHeapCapacity', function() {
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
    var results = Ember.Object.create();
    
    Ember.run.later(encampment, function() {
      this.get('resourceTypes').forEach(function(resource) {
        var baseCapacity = encampment.get('base' + resource.capitalize() + 'Capacity');
        var spaceAvailable = encampment.get(resource + 'SpaceAvailable');
        
        // Integer between 0 and the base resource capacity
        var basePortion = Math.round(Math.random() * baseCapacity);
        
        // Multiplier for the number of survivors sent
        var survivorMultiplier = Math.round(Math.random() * numSurvivors);
        
        // Number of survivors sent times the base percentage
        var count =  survivorMultiplier * basePortion;
        
        if(spaceAvailable > count) {
          encampment.incrementProperty(resource, count);
          results.set(resource, count);
        }
      });
    }, 1000);
  },
  
  purchaseBuilding(building) {
    var encampment = this;
    if(this.canAfford(building)) {
      this.get('resourceTypes').forEach(function(resource) {
        var price = building.price[resource] || 0;
        this.decrementProperty(resource, price);
      }, encampment);
      this.incrementProperty(building.storeKey);
    }
  },
  
  canAfford(building) {
    var afford = true;
    
    this.get('resourceTypes').forEach(function(resource) {
      var price = building.price[resource] || 0;
      if(this.get(resource) < price) {
        afford = false;
      }
    }, this);
    
    return afford;
  }
});

import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  // Services
  messages: Ember.inject.service(),
  activities: Ember.inject.service(),
  
  // Location
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  
  // Buildings
  buildingTypes: ['tents', 'waterReservoirs', 'coldStorage', 'sheds', 'fuelTanks', 'scrapHeaps'],
  buildingCounts: Ember.computed.collect('tents', 'waterReservoirs', 'coldStorage', 'sheds', 'fuelTanks', 'scrapHeaps'),
  totalBuildings: Ember.computed.sum('buildingCounts'),
  
  // Survivors
  survivors: DS.attr('number', {defaultValue: 0}),
  busySurvivors: 0,
  allSurvivorsAreIdle: Ember.computed.equal('busySurvivors', 0),
  availableSurvivors: Ember.computed('survivors', 'busySurvivors', function() {
    return this.get('survivors') - this.get('busySurvivors');
  }),
  tents: DS.attr('number', {defaultValue: 0}),
  shacks: DS.attr('number', {defaultValue: 0}),
  baseCapacity: 1,
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
  noVacancy: Ember.computed.not('hasVacancy'),
  
  
  // Resources
  resourceTypes: ['water', 'food', 'cloth', 'fuel', 'metal'],
  resourceCounts: Ember.computed.collect('water', 'food', 'cloth', 'fuel', 'metal'),
  totalResources: Ember.computed.sum('resourceCounts'),
  
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
  
  // Technologies
  technologyTypes: ['generators', 'vehicles', 'lights', 'radios', 'drones'],
  technologyCounts: Ember.computed.collect('generators', 'vehicles', 'lights', 'radios', 'drones'),
  totalTechnologies: Ember.computed.sum('technologyCounts'),
  
  generators: DS.attr('number', {defaultValue: 0}),
  vehicles: DS.attr('number', {defaultValue: 0}),
  lights: DS.attr('number', {defaultValue: 0}),
  radios: DS.attr('number', {defaultValue: 0}),
  drones: DS.attr('number', {defaultValue: 0}),
  
  // Weapons
  weaponTypes: ['bearTraps', 'chainsaws', 'pistols', 'shotguns', 'rpgs'],
  weaponCounts: Ember.computed.collect('bearTraps', 'chainsaws', 'pistols', 'shotguns', 'rpgs'),
  totalWeapons: Ember.computed.sum('weaponCounts'),
  weapons: Ember.inject.service(),
  
  bearTraps: DS.attr('number', {defaultValue: 0}),
  chainsaws: DS.attr('number', {defaultValue: 0}),
  pistols: DS.attr('number', {defaultValue: 0}),
  shotguns: DS.attr('number', {defaultValue: 0}),
  rpgs: DS.attr('number', {defaultValue: 0}),
  
  attackPoints: Ember.computed('totalWeapons', function() {
    var encampment = this;
    return this.get('weaponTypes').reduce(function(previousValue, item) {
      var weaponAttack = encampment.get('weapons.types').findBy('storeKey', item).get('power.attack');
      return previousValue + (encampment.get(item) * weaponAttack);
    }, 1);
  }),
  defensePoints: Ember.computed('totalWeapons', function() {
    var encampment = this;
    return this.get('weaponTypes').reduce(function(previousValue, item) {
      var weaponDefense = encampment.get('weapons.types').findBy('storeKey', item).get('power.defense');
      return previousValue + (encampment.get(item) * weaponDefense);
    }, 1);
  }),
  
  // Methods
  addSurvivor() {
    if(this.get('hasVacancy')) {
      var count = this.incrementProperty('survivors');
      var addlSurvivors = [
      `You have found an additional survivor.`, 
      `Someone wandered in.`,
      `A person needed help in the wasteland.`,
      `A cowboy rode in on an irradiated muskrat.`,
      `An other-worldly portal opened and out stepped a man in a leather duster.`,
      `While exploring, you encountered a stranger in need.`
      ];
      this.get('messages').newTextMessage(addlSurvivors[Math.floor(Math.random()*addlSurvivors.length)] + ` You now have ${count} survivors in your encampment.`);
    }
  },
  
  collectResources(numSurvivors) {
    var encampment = this;
    var results = [];
    var time = Math.round(Math.random() * 10);
    
    this.incrementProperty('busySurvivors', numSurvivors);
    this.get('activities').addActivity('Search party', time);
    
    Ember.run.later(encampment, function() {
      encampment.decrementProperty('busySurvivors', numSurvivors);
      
      this.get('resourceTypes').forEach(function(resource) {
        var baseCapacity = encampment.get('base' + resource.capitalize() + 'Capacity');
        var spaceAvailable = encampment.get(resource + 'SpaceAvailable');
        
        // Integer between 0 and the base resource capacity
        var basePortion = Math.round(Math.random() * baseCapacity);
        
        // Multiplier for the number of survivors sent
        var survivorMultiplier = Math.round(Math.random() * numSurvivors);
        
        // Number of survivors sent times the base percentage
        var count =  survivorMultiplier * basePortion;
        
        if(spaceAvailable > count && count > 0) {
          encampment.incrementProperty(resource, count);
          results.pushObject({
            type: resource,
            count: count
          });
        }
      });
      
      if(Ember.isPresent(results)) {
        this.get('messages').newCollectionMessage('Your search party has returned. Items collected:', results);
      } else {
        this.get('messages').newTextMessage('Your search party has returned. No items were found');
      }
    }, (time * 1000));
    
  },
  
  purchaseBuilding(building) {
    var encampment = this;
    if(this.canAfford(building)) {
      this.get('resourceTypes').forEach(function(resource) {
        var price = building.price[resource] || 0;
        this.decrementProperty(resource, price);
      }, encampment);
      
      this.get('messages').newTextMessage(`Building a new ${building.name}...`);
      this.get('activities').addActivity(`New ${building.name}`, building.time);
      
      Ember.run.later(encampment, function() {
        var count = this.incrementProperty(building.storeKey);
        this.get('messages').newTextMessage(`You added a ${building.name}. You now have ${count}.`);
      }, building.time * 1000);
    } else {
      this.get('messages').newTextMessage(`You don't have enough resources to build a ${building.name}.`, "error");
    }
  },
  
  purchaseTech(tech) {
    var encampment = this;
    if(this.canAfford(tech)) {
      this.get('resourceTypes').forEach(function(resource) {
        var price = tech.price[resource] || 0;
        this.decrementProperty(resource, price);
      }, encampment);
      
      this.get('messages').newTextMessage(`Building a new ${tech.name}...`);
      this.get('activities').addActivity(`New ${tech.name}`, tech.time);
      
      Ember.run.later(encampment, function() {
        var count = this.incrementProperty(tech.storeKey);
        this.get('messages').newTextMessage(`You added a ${tech.name}. You now have ${count}.`);
      }, tech.time * 1000);
    } else {
      this.get('messages').newTextMessage(`You don't have enough resources to build a ${tech.name}.`, "error");
    }
  },
  
  purchaseWeapon(weapon) {
    var encampment = this;
    if(this.canAfford(weapon)) {
      this.get('resourceTypes').forEach(function(resource) {
        var price = weapon.price[resource] || 0;
        this.decrementProperty(resource, price);
      }, encampment);
      
      this.get('messages').newTextMessage(`Building a new ${weapon.name}...`);
      this.get('activities').addActivity(`New ${weapon.name}`, weapon.time);
      
      Ember.run.later(encampment, function() {
        var count = this.incrementProperty(weapon.storeKey);
        this.get('messages').newTextMessage(`You added a ${weapon.name}. You now have ${count}.`);
      }, weapon.time * 1000);
    } else {
      this.get('messages').newTextMessage(`You don't have enough resources to build a ${weapon.name}.`, "error");
    }
  },
  
  canAfford(item) {
    var afford = true;
    
    this.get('resourceTypes').forEach(function(resource) {
      var price = item.price[resource] || 0;
      if(this.get(resource) < price) {
        afford = false;
      }
    }, this);
    
    return afford;
  }
});

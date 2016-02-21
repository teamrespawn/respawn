import Ember from 'ember';
import Building from './building';

export default Ember.Service.extend({
  types: Ember.computed.collect('tent', 'waterReservoir', 'coldStorage', 'shed', 'fuelTank', 'scrapHeap'),
  
  tent: Building.create({
    name: 'tent',
    price: {
      cloth: 1,
      food: 1
    }
  }),
  
  waterReservoir: Building.create({
    name: 'water reservoir',
    price: {
      metal: 1,
      cloth: 1
    }
  }),
  
  coldStorage: Building.create({
    name: 'cold storage',
    price: {
      metal: 1,
      water: 1
    }
  }),
  
  shed: Building.create({
    name: 'shed',
    price: {
      metal: 1,
      food: 1
    }
  }),
  
  fuelTank: Building.create({
    name: 'fuel tank',
    price: {
      metal: 2
    }
  }),
  
  scrapHeap: Building.create({
    name: 'scrap heap',
    price: {
      food: 1,
      water: 1
    }
  })
});

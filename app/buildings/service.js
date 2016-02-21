import Ember from 'ember';
import Building from './building';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  encampment: Ember.computed.alias('session.currentEncampment'),
  types: Ember.computed.collect('tent', 'waterReservoir', 'coldStorage', 'shed', 'fuelTank', 'scrapHeap'),
  
  tent: Building.create({
    name: 'tent',
    price: {
      cloth: 1,
      food: 1
    },
    storeKey: 'tents',
    return: {
      'survivor capacity': 1
    }
  }),
  
  waterReservoir: Building.create({
    name: 'water reservoir',
    price: {
      metal: 1,
      cloth: 1
    },
    storeKey: 'waterReservoirs',
    return: {
      'water capacity': 1
    }
  }),
  
  coldStorage: Building.create({
    name: 'cold storage',
    price: {
      metal: 1,
      water: 1
    },
    storeKey: 'coldStorage',
    return: {
      'food capacity': 1
    }
  }),
  
  shed: Building.create({
    name: 'shed',
    price: {
      metal: 1,
      food: 1
    },
    storeKey: 'sheds',
    return: {
      'cloth capacity': 1
    }
  }),
  
  fuelTank: Building.create({
    name: 'fuel tank',
    price: {
      metal: 2
    },
    storeKey: 'fuelTanks',
    return: {
      'fuel capacity': 1
    }
  }),
  
  scrapHeap: Building.create({
    name: 'scrap heap',
    price: {
      food: 1,
      water: 1
    },
    storeKey: 'scrapHeaps',
    return: {
      'metal capacity': 1
    }
  })
});

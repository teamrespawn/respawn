import Ember from 'ember';
import Technology from './technology';

export default Ember.Service.extend({
  encampment: Ember.computed.alias('session.currentEncampment'),
  types: Ember.computed.collect('generator', 'vehicle', 'lights', 'radio', 'drone'),
  
  generator: Technology.create({
    name: 'generator',
    storeKey: 'generators',
    price: {
      fuel: 5
    },
    benefit: {
      something: 1
    }
  }),
  
  vehicle: Technology.create({
    name: 'vehicle',
    storeKey: 'vehicles',
    price: {
      fuel: 5
    },
    benefit: {
      something: 1
    }
  }),
  
  lights: Technology.create({
    name: 'lights',
    storeKey: 'lights',
    price: {
      metal: 5
    },
    benefit: {
      something: 1
    }
  }),
  
  radio: Technology.create({
    name: 'radio',
    storeKey: 'radios',
    price: {
      metal: 5
    },
    benefit: {
      something: 1
    }
  }),
  
  drone: Technology.create({
    name: 'drone',
    storeKey: 'drones',
    price: {
      metal: 5
    },
    benefit: {
      something: 1
    }
  })
});

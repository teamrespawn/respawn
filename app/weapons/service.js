import Ember from 'ember';
import Weapon from './weapon';

export default Ember.Service.extend({
  types: Ember.computed.collect('bearTrap', 'chainsaw', 'pistol', 'shotgun', 'rpg'),
  
  bearTrap: Weapon.create({
    name: 'bear trap',
    storeKey: 'bearTraps',
    power: {
      attack: 1,
      defense: 1
    },
    price: {
      metal: 1
    },
    time: 2
  }),
  
  chainsaw: Weapon.create({
    name: 'chainsaw',
    storeKey: 'chainsaws',
    power: {
      attack: 1,
      defense: 1
    },
    price: {
      metal: 1
    },
    time: 2
  }),
  
  pistol: Weapon.create({
    name: 'pistol',
    storeKey: 'pistols',
    power: {
      attack: 1,
      defense: 1
    },
    price: {
      metal: 1
    },
    time: 2
  }),
  
  shotgun: Weapon.create({
    name: 'shotgun',
    storeKey: 'shotguns',
    power: {
      attack: 1,
      defense: 1
    },
    price: {
      metal: 1
    },
    time: 2
  }),
  
  rpg: Weapon.create({
    name: 'rpg',
    storeKey: 'rpgs',
    power: {
      attack: 1,
      defense: 1
    },
    price: {
      metal: 1
    },
    time: 2
  })
});

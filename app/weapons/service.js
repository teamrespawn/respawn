import Ember from 'ember';
import Weapon from './weapon';

export default Ember.Service.extend({
  types: Ember.computed.collect('bearTrap', 'chainsaw', 'pistol', 'shotgun', 'rpg'),
  
  bearTrap: Weapon.create({
    name: 'bear trap',
    storeKey: 'bearTraps'
  }),
  
  chainsaw: Weapon.create({
    name: 'chainsaw',
    storeKey: 'chainsaws'
  }),
  
  pistol: Weapon.create({
    name: 'pistol',
    storeKey: 'pistols'
  }),
  
  shotgun: Weapon.create({
    name: 'shotgun',
    storeKey: 'shotguns'
  }),
  
  rpg: Weapon.create({
    name: 'rpg',
    storeKey: 'rpgs'
  })
});
